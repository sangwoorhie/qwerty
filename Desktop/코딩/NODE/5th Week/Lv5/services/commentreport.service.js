const CommentReportRepository = require('../repositories/commentreport.repositories'); // 댓글신고 레파지토리
const PostRepository = require('../repositories/posts.repository'); // 게시글 레파지토리
const CommentRepository = require('../repositories/comments.repository');


class CommentReportService {
    commentReportRepository = new CommentReportRepository();
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();

    // 1. 댓글 신고
    createReport = async (postId, commentId, userId, content) => {

        const findPost = await this.postRepository.findPostById(postId);
        if(!findPost) throw new Error('게시글이 존재하지 않습니다.');
        else if (!userId) throw new Error('로그인 후 이용할 수 있는 기능입니다.');
        else if (!content) throw new Error('정당한 신고 사유를 입력해주세요.');

        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) throw new Error('댓글이 존재하지 않습니다.');

        await this.commentReportRepository.createReport(postId, commentId, userId, content)
        const createReport = await this.commentRepository.findCommentById(commentId);


        return {
            postId: createReport.postId,
            commentId: createReport.commentId,
            content: createReport.content,
            reportUserId: createReport.reportUserId,
            createdAt: createReport.createdAt,
            updatedAt: createReport.updatedAt
        }};


    // 2. 댓글 신고 취소
    deleteReport = async (postId, commentId, userId) => {
        const findPost = await this.postRepository.findPostById(postId);
        if(!findPost) throw new Error('게시글이 존재하지 않습니다.');
        else if (!userId) throw new Error('댓글신고 취소 권한이 없습니다.');

        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findComment) throw new Error('댓글이 존재하지 않습니다.');
        
        await this.commentReportRepository.deleteReport(postId, commentId, userId)
        const deleteReport = await this.commentRepository.findCommentById(commentId);

        return {
            postId: createReport.postId,
            commentId: createReport.commentId,
            content: createReport.content,
            reportUserId: createReport.reportUserId,
            createdAt: createReport.createdAt,
            updatedAt: createReport.updatedAt
        }};

}

module.exports = CommentReportService;

