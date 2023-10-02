const { PostReports } = require('../models')

class PostReportRepository {


    
// 1. 게시글 신고 생성
createReport = async (postId, content, userId) => {
    const createReport = await PostReports.create({PostId: postId, content, reportUserId: userId})
    return createReport;
}



// 2. 게시글 신고 취소
deleteReport = async (postId, userId) => {
    const deleteReport = await PostReports.destroy({ where: { postId, userId }});
    return deleteReport;
}


}

module.exports = PostReportRepository