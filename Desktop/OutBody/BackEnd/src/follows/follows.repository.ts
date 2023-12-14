import { Injectable } from '@nestjs/common';
import { Follow } from 'src/entities/follow.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class FollowsRepository extends Repository<Follow> {
  constructor(private readonly dataSource: DataSource) {
    super(Follow, dataSource.createEntityManager());
  }

  //친구추가
  async createFollow(followId: number, userId: number) {
    const follow = await this.create({ followId, userId });
    return await this.save(follow);
  }
  //친구 여부 조회
  async getFollowById(followId: number, userId: number) {
    return await this.findOne({
      where: [
        { followId: followId, userId: userId },
        { followId: userId, userId: followId },
      ],
    });
  }

  // 내 follow 목록 가져오기
  async getUsersFollow(userId: number): Promise<any[]> {
    const followers = await this.createQueryBuilder('follow')
      .select([
        'user.id as id',
        'user.name as name',
        'user.email as email',
        'user.imgUrl as imgUrl',
        'user.point as point',
      ])
      .innerJoin(
        User,
        'user',
        '(user.id = follow.followId OR user.id = follow.userId) AND user.id != :userId',
        { userId },
      )
      .where('follow.userId = :userId OR follow.followId = :userId', { userId })
      .getRawMany();

    return followers;
  }
  //친구삭제//
  async deleteFollower(userId: number, followId: number) {
    const deleted = await this.delete({ followId, userId });
    return deleted;
  }
}
