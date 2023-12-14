import { UserRepository } from 'src/users/users.repository';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  NotImplementedException,
  UnauthorizedException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/users.create.dto';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dto/users.update.dto';
import { UserPasswordDto } from './dto/password.update.dto';
import { BlackListRepository } from 'src/blacklists/blacklist.repository';
import { FollowsRepository } from 'src/follows/follows.repository';
import { UserRecommendationDto } from './dto/recommendation.dto';
import { SignoutDto } from './dto/user.signout.dto';
import { AwsService } from '../aws.service';
import { User } from '../entities/user.entity';
import { ChallengersRepository } from 'src/challenges/challengers.repository';
import { Status } from 'src/users/userInfo';
import { Challenger } from 'src/entities/challenger.entity';
import * as nodemailer from 'nodemailer';
import { ConfirmPasswordDto } from './dto/confirmPw.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly awsService: AwsService,
    private readonly usersRepository: UserRepository,
    private readonly blacklistRepository: BlackListRepository,
    private readonly followRepository: FollowsRepository,
    private readonly challengerRepository: ChallengersRepository,
  ) {}

  // 회원가입, 블랙리스트에 있을 시 가입불가
  async createUser(user: UserCreateDto, verifyNumber: number) {
    const { name, email, verifyNumberInput, password, gender, birthday } = user;

    const existUser = await this.usersRepository.getUserByEmail(email);
    if (existUser) {
      throw new ConflictException('이미 존재하는 계정입니다.');
    }

    const existBlackList = await this.blacklistRepository.getBlacklistByEmail(
      email,
    );
    if (existBlackList) {
      throw new NotAcceptableException(
        '영구삭제된 계정입니다. 해당 계정(e-mail)은 사용할 수 없습니다.',
      );
    }

    if (verifyNumberInput != verifyNumber) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    const createUserResult = await this.usersRepository.createUser(
      name,
      email,
      password,
      gender,
      birthday,
    );

    return createUserResult;
  }

  // E-mail 발송
  async sendEmail(body: any) {
    const { email } = body;
    if (!email) {
      throw new NotFoundException('인증번호를 보낼 주소가 존재하지 않습니다.');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const min = 100000;
    const max = 999999;
    const verifyNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    transporter.sendMail({
      from: 'OUTBODY',
      to: email,
      subject: '[OUTBODY] 반갑습니다! 인증번호를 보내드립니다.',
      text: `우측의 6자리 인증번호를 '인증번호 입력란'에 입력해주세요! => ${verifyNumber}`,
    });

    return verifyNumber;
  }

  // 사용자 정보조회
  async getUserById(userId: number) {
    const user: User = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('해당 회원은 존재하지 않습니다.');
    }
    const allUsersRank: User[] =
      await this.usersRepository.getAllUsersForRank();
    const ranking =
      allUsersRank.findIndex((rankedUser) => rankedUser.id === userId) + 1;
    const challenger: Challenger =
      await this.challengerRepository.getChallengerWithUserId(userId);

    const result = {
      imgUrl: user.imgUrl,
      point: user.point,
      ranking: ranking,
      name: user.name,
      description: user.description,
      challengeId: challenger.challengeId,
    };
    return result;
  }

  // 내정보 + 친구 정보 조회
  async getUserInfo(user: User) {
    const {
      deletedAt,
      password,
      provider,
      refreshToken,
      updatedAt,
      status,
      ...rest
    } = user;

    const follow = await this.followRepository.getUsersFollow(user.id);
    if (!follow) {
      throw new NotFoundException('follower가 존재하지 않습니다.');
    }

    const allUsersRanked = await this.usersRepository.getAllUsersForRank();
    const challenger = await this.challengerRepository.getChallengerWithUserId(
      user.id,
    );

    const followersInfo = follow.map((follower) => {
      const ranking =
        allUsersRanked.findIndex(
          (rankedUser) => rankedUser.id === follower.id,
        ) + 1;

      return {
        id: follower.id,
        name: follower.name,
        email: follower.email,
        imgUrl: follower.imgUrl,
        ranking: ranking,
        point: follower.point,
      };
    });

    if (challenger) {
      return {
        rest,
        followersInfo,
        challengeId: challenger.challengeId,
      };
    }
    return { rest, followersInfo };
  }

  // 내 정보 수정
  async updateUser(user: User, body: UserUpdateDto, file: Express.Multer.File) {
    const { birthday, description, name } = body;

    const imageUrl = file
      ? (await this.awsService.uploadImage('outbody_user', file)).key
      : user.imgUrl;

    if (imageUrl !== user.imgUrl && user.imgUrl !== null) {
      await this.awsService.deleteImage(user.imgUrl);
    }

    const result = await this.usersRepository.updateUser(
      user.id,
      imageUrl,
      birthday || user.birthday,
      description || user.description,
      name || user.name,
    );
    return result;
  }

  // 유저 password수정
  async updatePassword(user, passwordDto: UserPasswordDto) {
    const { password, newPassword } = passwordDto;

    const ComparedPassword = await bcrypt.compare(password, user.password);
    if (!ComparedPassword) {
      throw new UnauthorizedException('password가 일치하지 않습니다');
    }

    const update = await this.usersRepository.updatePassword(
      user.id,
      newPassword,
    );

    if (!update) {
      throw new NotImplementedException('해당 작업을 수행하지 못했습니다.');
    }
  }

  //회원탈퇴
  async deletUser(user, signoutDto: SignoutDto) {
    const { password } = signoutDto;

    if (!password) {
      throw new BadRequestException('비밀번호를 입력해 주세요');
    }

    const ComparedPassword = await bcrypt.compare(password, user.password);

    if (!ComparedPassword) {
      throw new UnauthorizedException('password가 일치하지 않습니다');
    }

    const result = await this.usersRepository.deleteUser(user.id);

    if (!result) {
      throw new NotImplementedException('해당 작업을 완료하지 못했습니다');
    }
    return result;
  }

  // 유저 전체목록
  async getAllUsers(userId: number): Promise<UserRecommendationDto[]> {
    const users = await this.usersRepository.getAllUsers(userId);

    if (!users) {
      throw new NotImplementedException('해당 작업을 완료하지 못했습니다');
    }
    return users.map((user) => ({
      name: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
    }));
  }

  //유저 Email로 조회
  async getUserByEmail(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('존재하는 유저가 아닙니다.');
    }
    return user;
  }

  // 친구 수
  async getCountFriends(userId: number): Promise<number[]> {
    const followedIds = await this.followRepository
      .createQueryBuilder('follow')
      .select('follow.followId')
      .where('follow.userId = :userId', { userId })
      .andWhere('follow.deletedAt IS NULL')
      .getMany();

    return followedIds.map((follow) => follow.followId);
  }

  //유저 포인트 랭크 조회
  async getUsersRank(id) {
    const findUsers = await this.usersRepository.getAllUsersForRank();
    const myRank = findUsers.findIndex((user) => user.id === id) + 1;
    return myRank;
  }

  // 관리자 권한 모든 유저조회
  async getAllregisters(status: Status, page: number, pageSize: number) {
    // if (status !== 'admin') {
    //   throw new NotAcceptableException('해당 기능에 대한 접근권한이 없습니다.');
    // }
    const allUsers = await this.usersRepository.getAllregisters();
    if (!allUsers || allUsers.length <= 0) {
      throw new NotFoundException('데이터가 존재하지 않습니다.');
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(allUsers.length / pageSize);

    const pageinatedUsers = allUsers.slice(startIndex, endIndex);
    return { totalPages, pageinatedUsers };
  }

  // 카카오 회원추가
  async createKakaoUser(user) {
    await this.usersRepository.insert({
      email: user.email,
      name: user.nickName,
    });
  }

  // 비밀번호로 관리자 조회
  async confirmAdmin(user, confirmPasswordDto: ConfirmPasswordDto) {
    const { password } = confirmPasswordDto;

    const admin = await this.usersRepository.confirmAdmin(password);

    if (!password) {
      throw new BadRequestException('비밀번호를 입력해주세요.');
    } else if (password !== admin.password) {
      throw new UnauthorizedException('password가 일치하지 않습니다.');
    }

    if (admin.status !== 'admin') {
      throw new UnauthorizedException('해당 기능에 대한 접근권한이 없습니다.');
    }
    if (admin.status === 'admin') {
      return admin;
    }
  }
}
