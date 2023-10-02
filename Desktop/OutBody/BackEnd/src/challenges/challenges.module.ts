import { Challenger } from 'src/challenges/entities/challenger.entity';
import { Logger, Module } from '@nestjs/common';
import { ChallengesController } from './controllers/challenges.controller';
import { ChallengesService } from './services/challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { ChallengesRepository } from './repositories/challenges.repository';
import { ChallengeScheduler } from './services/challenges.scheduler';
import { UserRepository } from 'src/users/repositories/users.repository';
import { Follow } from 'src/follows/entities/follow.entity';
import { User } from 'src/users/entities/user.entity';
import { GoalsRepository } from './repositories/goals.repository';
import { ChallengersRepository } from './repositories/challengers.repository';
import { FollowsRepository } from 'src/follows/repositories/follows.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsRepository } from 'src/posts/repositories/posts.repository';
import { RecordsRepository } from 'src/records/repositories/records.repository';
import { InviteChallenge } from './entities/inviteChallenge.entity';
import { InviteChallengesRepository } from './repositories/inviteChalleges.repository';
import { Notification } from './entities/notification.entity';
import { NotificationsRepository } from './repositories/notifications.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Challenge,
      Challenger,
      Follow,
      User,
      InviteChallenge,
      Notification,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ChallengesController],
  providers: [
    ChallengesService,
    ChallengesRepository,
    GoalsRepository,
    ChallengersRepository,
    Logger,
    ChallengeScheduler,
    UserRepository,
    ChallengeScheduler,
    FollowsRepository,
    PostsRepository,
    RecordsRepository,
    InviteChallengesRepository,
    NotificationsRepository,
  ],
  exports: [
    ChallengesService,
    ChallengesRepository,
    GoalsRepository,
    ChallengersRepository,
    ChallengeScheduler,
    UserRepository,
    FollowsRepository,
    PostsRepository,
    RecordsRepository,
    InviteChallengesRepository,
    NotificationsRepository,
  ],
})
export class ChallengesModule {}
