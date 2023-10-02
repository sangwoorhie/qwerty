const CommentReportService = require('../services/commentreport.service')

class CommentReportController {
    commentReportService = new CommentReportService();

    // 1. 댓글 신고
    createReport = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const { content } = req.body;
        const { userId } = res.locals.user;
        const commentReport = await this.commentReportService.createReport(postId, commentId, userId, content);
        res.status(201).json({data: commentReport, message: "댓글 신고가 완료되었습니다."})
    }


    // 2. 댓글 신고 취소
    deleteReport = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const { userId } = res.locals.user;
        const commentReportCancel = await this.commentReportService.deleteReport(postId, commentId, userId);
        res.status(201).json({data: commentReportCancel, message:"댓글 신고가 취소되었습니다."})
    }



}


module.exports = CommentReportController;


