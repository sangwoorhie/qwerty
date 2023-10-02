const { CommentReports } = require('../models');


class CommentReportRepository {

// 1. 댓글 신고 생성
createReport = async (postId, commentId, userId, content) => {
    const createCommentReport = await  CommentReports.create({postId, commentId, reportUserId: userId, content})
    return createCommentReport;
}


// 2. 댓글 신고 취소
deleteReport = async (postId, commentId, userId) => {
    const deleteCommentReport = await CommentReports.destroy({postId, commentId, reportUserId: userId})
    return deleteCommentReport;
};

}

module.exports = CommentReportRepository