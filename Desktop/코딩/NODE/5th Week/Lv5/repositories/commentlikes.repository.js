const { CommentLikes } = require('../models') // DB에 접근
const { Op } = require("sequelize");

class CommentLikeskRepository {


// 1. 댓글 좋아요 생성
createLike = async(postId, commentId, userId) => {
    const createCommentLike = await CommentLikes.create({PostId: postId, commentId: Number(commentId), UserId: Number(userId)})
    return createCommentLike;
};


// 2. 댓글 좋아요 취소
deleteLike = async(postId, commentId, userId) => {
    const deleteCommentLike = await CommentLikes.destroy({where: {[Op.and]: [{userId: Number(userId)}, {commentId: Number(commentId)}]}});
    return deleteCommentLike;
};

}

module.exports = CommentLikeskRepository