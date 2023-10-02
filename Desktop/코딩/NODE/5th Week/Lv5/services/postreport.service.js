const PostReportRepository = require('../repositories/postreport.repositories');

class PostReportService {
    postReportRepository = new PostReportRepository();


    // 1.게시글 신고
    createReport = async(postId, content, userId) => {
        const createReport = await this.postReportRepository.createReport(postId, content, userId)
        if (!postId) {throw new Error('게시글이 존재하지 않습니다.')};
        if (!content) {throw new Error('정당한 신고 사유를 기재해주세요.')};
        if (!userId) {throw new Error('로그인 후 사용할 수 있는 기능입니다.')};
    
        return {
            PostId: createReport.PostId,
            content: createReport.content,
            reportUserId: createReport.reportUserId,
            createdAt: createReport.createdAt,
            updatedAt: createReport.updatedAt
        }};





    // 2. 게시글 신고 취소
    deleteReport = async(postId, userId) => {
        const findPost = await this.postReportRepository.findPostById(postId)
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.")
        else if(!userId) throw new Error("게시글 신고 취소 권한이 없습니다.")

        await this.postReportRepository.deleteReport(postId, userId)
        return {
            PostId: createReport.PostId,
            content: createReport.content,
            reportUserId: createReport.reportUserId,
            createdAt: createReport.createdAt,
            updatedAt: createReport.updatedAt
        }};
    }



module.exports = PostReportService;