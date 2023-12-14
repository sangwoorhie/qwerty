import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from './users.repository';
import { Follow } from 'src/entities/follow.entity';
import { FollowsRepository } from 'src/follows/follows.repository';
import { BlackListRepository } from 'src/blacklists/blacklist.repository';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AwsService } from 'src/aws.service';
import { AuthsModule } from 'src/auth/auth.module';
import { ChallengersRepository } from 'src/challenges/challengers.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    forwardRef(() => AuthsModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    FollowsRepository,
    BlackListRepository,
    AuthService,
    AuthMiddleware,
    AwsService,
    ChallengersRepository,
  ],
})
export class UsersModule {}
