import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('challenge')
@UseInterceptors(Response)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // 오운완 좋아요 생성
  // http://localhost:3000/challenge/:challengeId/post/:postId/like
  @Post('/:challengeId/post/:postId/like')
  async createLike(
    @Param('challengeId') challengeId: number,
    @Param('postId') postId: number,
    @Req() req: any,
  ) {
    const like = await this.likesService.createLike(
      challengeId,
      postId,
      req.user.id,
    );
    if (like) {
      return { message: `${postId}번 오운완 게시글에 좋아요를 눌렀습니다.` };
    }
  }

  // 오운완 게시글당 좋아요수 조회
  // http://localhost:3000/challenge/:challengeId/post/:postId/like
  @Get('/:challengeId/post/:postId/like')
  async likesCount(
    @Param('challengeId') challengeId: number,
    @Param('postId') postId: number,
  ) {
    const [likes, likeCount] = await this.likesService.likesCount(
      challengeId,
      postId,
    );

    return likeCount;
  }

  // 오운완 좋아요 취소
  // http://localhost:3000/challenge/:challengeId/post/:postId/like/:likeId
  @Delete('/:challengeId/post/:postId/like/:likeId')
  async deleteLike(
    @Param('challengeId') challengeId: number,
    @Param('postId') postId: number,
    @Param('likeId') likeId: number,
    @Req() req: any,
  ) {
    const unlike = await this.likesService.deleteLike(
      challengeId,
      postId,
      likeId,
      req.user.id,
    );
    if (unlike) {
      return { message: `${postId}번 오운완 게시글 좋아요를 취소했습니다.` };
    }
  }

  // 유저가 누른 좋아요 숫자 + 게시글목록 조회
  // http://localhost:3000/challenge/like/user
  @Get('/like/user')
  async usersLikes(@Req() req: any) {
    const userId = req.user.id;
    const [userLikes, userLikesCount] = await this.likesService.usersLikes(
      userId,
    );

    const likedPosts = userLikes.map((like) => {
      return {
        postId: like.postId,
        description: like.post.description,
      };
    });

    return {
      totalLikes: userLikesCount,
      likedPosts: likedPosts,
    };
  }
}
