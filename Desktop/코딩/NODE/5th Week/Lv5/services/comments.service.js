const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');

class CommentService {
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();


    
    // 1. 댓글 조회 findPostById
    findCommentsById = async (postId) => {
        const findPost = await this.postRepository.findPostById(postId)
        const findComments = await this.commentRepository.findCommentsById(findPost.postId) // s붙음 댓글의 배열

        return findComments; // 객체가들어있는 배열이 반환된다.
        };   
  


    // 2. 댓글 생성 createComment
    createComment = async (postId, userId, comment) => {
        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) {throw new Error('게시글이 존재하지 않습니다.')}; // 실행되면안됨

        const createCommentData = await this.commentRepository.createComment(postId, userId, comment)
        if(!postId) {throw new Error('게시글이 존재하지 않습니다.')}
        else if (!userId) {throw new Error('로그인 후 이용해주세요.')}
        else if (!comment) {throw new Error('내용을 입력해주세요.')};

        return {
            postId: createCommentData.postId,
            commentId: createCommentData.commentId,
            userId: createCommentData.userId,
            comment: createCommentData.comment,
            createdAt: createCommentData.createdAt,
            updatedAt: createCommentData.updatedAt
        }};



    // 3. 댓글 수정 updateComment
    updateComment = async (userId, postId, commentId, comment) => {

        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.")
        else if (!userId) {throw new Error("로그인 후 이용해주세요.")}
        else if (!comment) {throw new Error("댓글을 입력해주세요.")}


        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) {throw new Error("댓글이 존재하지 않습니다.")}
        

        await this.commentRepository.updateComment(postId, commentId, comment)
        const updateComment = await this.commentRepository.findCommentById(commentId)
        return {
            postId: updateComment.postId,
            userId: updateComment.userId,
            commentId: updateComment.commentId,
            comment: updateComment.comment,
            createdAt: updateComment.createdAt,
            updatedAt: updateComment.updatedAt
        }};
    



    // 4. 댓글 삭제 deleteComment
    deleteComment = async (userId, commentId, postId) => {
        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) {throw new Error("게시글이 존재하지 않습니다.")}
        else if (!userId) {throw new Error("댓글이 존재하지 않습니다.")}
        else if (!commentId) {throw new Error("댓글을 입력해주세요.")}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) {throw new Error("댓글이 존재하지 않습니다.")}


        await this.commentRepository.deleteComment(postId, commentId)
        const deleteComment = await this.commentRepository.findCommentById(postId, commentId)
        return {
            postId: deleteComment.postId,
            userId: deleteComment.userId,
            commentId: deleteComment.commentId,
            comment: deleteComment.comment,
            createdAt: deleteComment.createdAt,
            updatedAt: deleteComment.updatedAt
        }};
    }


module.exports = CommentService;