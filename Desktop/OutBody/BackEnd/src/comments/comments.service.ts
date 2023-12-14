import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}
  // 오운완 게시글에 댓글 작성
  async createComment(
    createCmt: CreateCommentDto,
    challengeId: number,
    postId: number,
    userId: number,
  ) {
    const { comment } = createCmt;

    if (!createCmt.comment) {
      throw new BadRequestException('댓글을 입력해주세요.');
    }

    await this.commentsRepository.createComment(
      comment,
      challengeId,
      postId,
      userId,
    );
  }

  // 오운완 게시글에 댓글 전체 조회
  async getComment(challengeId: number, postId: number) {
    return await this.commentsRepository.getComment(challengeId, postId);
  }

  // 오운완 게시글에 댓글 수정
  async updateComment(
    challengeId: number,
    postId: number,
    commentId: number,
    userId: number,
    updateCmt: UpdateCommentDto,
  ) {
    const { comment } = updateCmt;
    // 댓글 유무 조회
    const existComment = await this.commentsRepository.existComment(commentId);

    if (!updateCmt.comment) {
      throw new BadRequestException('댓글을 입력해주세요.');
    }
    if (!existComment) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }
    if (existComment.userId !== userId) {
      throw new UnauthorizedException(
        '자신이 작성한 댓글만 수정할 수 있습니다.',
      );
    }

    return await this.commentsRepository.updateComment(
      challengeId,
      postId,
      commentId,
      comment,
    );
  }

  // 오운완 게시글에 댓글 삭제
  async deleteComment(
    challengeId: number,
    postId: number,
    commentId: number,
    userId: number,
  ) {
    // 댓글 유무 조회
    const existComment = await this.commentsRepository.existComment(commentId);

    if (!existComment) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }
    if (existComment.userId !== userId) {
      throw new UnauthorizedException(
        '자신이 작성한 댓글만 삭제할 수 있습니다.',
      );
    }

    return await this.commentsRepository.deleteComment(
      challengeId,
      postId,
      commentId,
    );
  }
}
