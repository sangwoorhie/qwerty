const CommentService = require('../services/comments.service')


class CommentsController {
    commentService = new CommentService();


    // 1. 댓글 조회 findPostById
    getCommentById = async (req, res, next) => {
        const { postId } = req.params;
        const comment = await this.commentService.findCommentsById(postId);
        res.status(200).json({data: comment});
    }


    // 2. 댓글 생성 createComment
    createComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params;
        const { comment } = req.body;
        const createCommentData = await this.commentService.createComment(postId, userId, comment);
        res.status(201).json({data: createCommentData, message:"댓글이 등록되었습니다."});
    }


    // 3. 댓글 수정 updateComment
    updateComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        const updateComment = await this.commentService.updateComment(userId, postId, commentId, comment);
        res.status(200).json({data: updateComment, message: "댓글이 수정되었습니다."});
    }



    // 4. 댓글 삭제 deleteComment
    deleteComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId, commentId } = req.params;
        const deleteComment = await this.commentService.deleteComment(userId, commentId, postId);
        res.status(200).json({data: deleteComment, message: "댓글이 삭제되었습니다."});
    }

}

module.exports = CommentsController;