const PostReportService = require('../services/postreport.service')

class PostReportController {
    postReportService = new PostReportService();


    // 1. 게시글 신고
    createReport = async (req, res, next) => {
        const { postId } = req.params;
        const { content } = req.body;
        const { userId } = res.locals.user;
        const postReport = await this.postReportService.createReport(postId, content, userId);
        res.status(201).json({data: postReport, message: "게시글 신고가 완료되었습니다."})
    };


    // 2. 게시글 신고 취소
    deleteReport = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const postReportCancel = await this.postReportService.deleteReport(postId, userId);
        res.status(201).json({data: postReportCancel, message: "게시글 신고가 취소되었습니다."})
    }




}

module.exports = PostReportController;