const CommentLikeService = require('../services/commentlikes.service');


class CommentLikesController {
    commentLikeService = new CommentLikeService();

// // 1. 댓글 좋아요 조회
// getCommentLikes = async (req, res, next) => {
//     const { postId, commentId } = req.params;
//     const commentLikes = await this.commentLikeService.findCommentById(postId, commentId)
//     res.status(200).json({data: commentLikes})
// }


// 2. 댓글 좋아요 생성
createCommentLikes = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;
    const createLike = await this.commentLikeService.createLike(postId, commentId, userId);
    res.status(201).json({data: createLike, message: "댓글에 좋아요를 눌렀습니다."})
}


// 3. 댓글 좋아요 삭제
deleteCommentLikes = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;
    const  deleteLike = await this.commentLikeService.deleteLike(postId, commentId, userId)
    res.status(201).json({data: deleteLike, message: "댓글 좋아요가 취소되었습니다."})
}


};

module.exports = CommentLikesController;