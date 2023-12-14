import {
  Injectable,
  NotImplementedException,
  Logger,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowMessage } from '../entities/followMessage.entity';
import { DataSource, Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { FollowsRepository } from './follows.repository';

@Injectable()
export class FollowsService {
  private readonly logger = new Logger(FollowsService.name);
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(FollowMessage)
    private followMessageRepository: Repository<FollowMessage>,
    private dataSource: DataSource,
    private readonly followsRepository: FollowsRepository,
  ) {}

  //친구요청 기능
  async requestFollow(followId: number, user) {
    if (followId === user.id) {
      throw new NotAcceptableException('수행할 수 없는 요청입니다.');
    }
    const existFollowMessage = await this.followMessageRepository.findOne({
      where: { userId: user.id, followId },
    });

    if (existFollowMessage) {
      throw new NotAcceptableException('이미 요청 내역이 존재합니다.');
    }
    const existFollow = await this.followRepository.findOne({
      where: { userId: user.id, followId },
    });
    const existFollowUser = await this.followRepository.findOne({
      where: { userId: followId, followId: user.id },
    });

    if (existFollow || existFollowUser) {
      throw new NotAcceptableException('수행할 수 없는 요청입니다.');
    }

    const message = `${user.name}(${user.email})님이 친구 요청을 보냈습니다.`;

    const newMessage = new FollowMessage();
    newMessage.userId = user.id;
    newMessage.followId = followId;
    newMessage.email = user.email;
    newMessage.name = user.name;
    newMessage.imgUrl = user.imgUrl;
    newMessage.message = message;
    const createItemResult = await this.followMessageRepository.save(
      newMessage,
    );

    return createItemResult;
  }

  //user의 보류중인 친구 요청 목록 전체 조회
  async getUsersRequests(userId: number) {
    const messagies = await this.followMessageRepository.find({
      where: { followId: userId },
    });

    if (!messagies || messagies.length <= 0) {
      throw new NotFoundException('친구 요청 목록이 존재하지 않습니다.');
    }

    return messagies;
  }

  //친구 수락여부 결정   data.response 의  yes or no  여부로 수락 or 취소 결정
  async acceptFollow(userId: number, followId: number, response) {
    const queryRunner = this.dataSource.createQueryRunner();
    if (response === 'yes') {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const newFollow = await queryRunner.manager.create(Follow, {
          userId,
          followId,
        });

        await this.followRepository.save(newFollow);
        await queryRunner.commitTransaction();
        return;
      } catch (e) {
        await queryRunner.rollbackTransaction();
        throw e;
      } finally {
        await queryRunner.release();
      }
    }

    await this.followMessageRepository.delete({ userId, followId });
  }

  // 친구 취소, follow삭제
  async deleteFollow(userId, followId) {
    if (userId === followId) {
      throw new NotAcceptableException('수행할 수 없는 요청입니다.');
    }

    // 내가 먼저 상대방을 친구 신청했을 경우
    const userTofollow = await this.followRepository.findOne({
      where: { userId, followId },
    });
    // 상대방이 먼저 나를 친구 신청했을 경우
    const followToUser = await this.followRepository.findOne({
      where: { userId: followId, followId: userId },
    });

    if (userTofollow) {
      const result = await this.followRepository.delete({ userId, followId });
      if (!result.affected) {
        throw new NotImplementedException('해당 작업을 수행할 수 없습니다.');
      }
      return result;
    }

    if (followToUser) {
      const result = await this.followRepository.delete({
        userId: followId,
        followId: userId,
      });
      if (!result.affected) {
        throw new NotImplementedException('해당 작업을 수행할 수 없습니다.');
      }
      return result;
    }
  }

  //친구 여부 조회
  async getFollow(followerId, userId) {
    const follow = await this.followsRepository.getFollowById(
      followerId,
      userId,
    );

    if (!follow) {
      return false;
    }
    return true;
  }
}
