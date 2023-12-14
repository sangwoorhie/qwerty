import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Get,
  Delete,
  Param,
  Req,
  Query,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeRequestDto } from './dto/create-challenge.request.dto';
import { InviteChallengeDto } from './dto/invite-challenge.dto';
import { ResponseChallengeDto } from './dto/response-challenge.dto';

@Controller('challenge')
@UseInterceptors(Response)
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  // 도전 생성
  // POST. http://localhost:3000/challenge
  @Post()
  async createChallenge(
    @Body() body: CreateChallengeRequestDto,
    @Req() req: any,
  ) {
    return await this.challengesService.createChallenge(body, req.user.id);
  }

  // 도전 목록 조회
  // GET http://localhost:3000/challenge
  @Get()
  async getChallenges(
    @Query('filter') filter: string,
    @Req() req: any,
    @Query('page') page: number,
  ) {
    const challenges = await this.challengesService.getChallenges(
      filter,
      req.user,
      page,
    );
    return challenges;
  }

  // 도전 상세 조회
  // GET http://localhost:3000/challenge/:id
  @Get('/:challengeId')
  async getChallenge(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
  ) {
    const challenge = await this.challengesService.getChallenge(challengeId);
    return challenge;
  }

  // 현재 사용자가 도전에 참가해있는지 여부와 기타 정보 확인
  // GET http://localhost:3000/challenge/:id/userState
  @Get('/:challengeId/userState')
  async checkUserChallengeState(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
    @Req() req: any,
  ) {
    const result = await this.challengesService.checkUserChallengeState(
      challengeId,
      req.user,
    );
    return result;
  }

  // 도전자 목록 조회
  // GET http://localhost:3000/challenge/:id/challengers
  @Get('/:challengeId/challengers')
  async getChallengers(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
  ) {
    const challengers = await this.challengesService.getChallengers(
      challengeId,
    );
    return challengers;
  }

  // 도전 삭제
  // DELETE http://localhost:3000/challenge/:id
  @Delete('/:challengeId')
  async deleteChallenge(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
    @Req() req: any,
  ) {
    await this.challengesService.deleteChallenge(challengeId, req.user.id);
  }

  // 도전 방 입장
  // POST http://localhost:3000/challenge/:id/enter
  @Post('/:challengeId/enter')
  async joinChallenge(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
    @Req() req: any,
  ) {
    return await this.challengesService.joinChallenge(challengeId, req.user);
  }

  // 도전 방 퇴장
  // DELETE http://localhost:3000/challenge/:id/leave
  @Delete('/:challengeId/leave')
  async leaveChallenge(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
    @Req() req: any,
  ) {
    return await this.challengesService.leaveChallenge(challengeId, req.user);
  }

  // 도전 친구 초대
  // POST http://localhost:3000/challenge/:id/invite
  @Post('/:challengeId/invite')
  async inviteChallenge(
    @Param(
      'challengeId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    challengeId: number,
    @Body() body: InviteChallengeDto,
    @Req() req: any,
  ) {
    return await this.challengesService.inviteChallenge(
      challengeId,
      body,
      req.user,
    );
  }

  // 나에게 온 도전 초대 목록 조회
  // GET http://localhost:3000/challenge/invite/list
  @Get('/invite/list')
  async getInvitedChallengies(@Req() req: any) {
    return await this.challengesService.getInvitedChallenges(req.user);
  }

  // 도전 초대 수락
  // POST http://localhost:3000/challenge/:id/accept
  @Post('/:userId/accept')
  async acceptChallenge(
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body() body: ResponseChallengeDto,
    @Req() req: any,
  ) {
    return await this.challengesService.acceptChallenge(userId, body, req.user);
  }

  // 도전 로그 조회
  // GET http://localhost:3000/challenge/message/log
  @Get('/message/log')
  async getChallengeLogs(@Req() req: any) {
    return await this.challengesService.getChallengeLogs(req.user.id);
  }
}
//
