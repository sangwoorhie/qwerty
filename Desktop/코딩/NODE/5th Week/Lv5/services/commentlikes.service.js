const CommentLikeskRepository = require('../repositories/commentlikes.repository');
const PostRepository = require('../repositories/posts.repository');
const CommentRepository = require('../repositories/comments.repository');

class CommentLikeService {
    commentLikeRepository = new CommentLikeskRepository();
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();
    
    

    // // 1. 댓글 좋아요 조회 findCommentById
    // findCommentsById = async (postId) => {
    //     const findPost = await this.postRepository.findPostById(postId)
    //     const findComments = await this.commentRepository.findCommentsById(findPost.postId) // s붙음 댓글의 배열

    //     return findComments; 
    //     }; 



    // 2. 댓글 좋아요 생성 createLike
    createLike = async (postId, commentId, userId) => {
        const findPost = await this.postRepository.findPostById(postId)
        if(!findPost) {throw new Error('게시글이 존재하지 않습니다.')}
        else if (!userId) {throw new Error("로그인 후 이용해주세요.")}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if(!findComment) {throw new Error('댓글이 존재하지 않습니다.')}

        await this.commentLikeRepository.createLike(postId, commentId, userId)
        const createLike = await this.commentRepository.findCommentById(commentId)
        
        
        // 이미 좋아요누른경우 못누르게 만들어야 함

        return {
            likeId: createLike.likeId,
            PostId: createLike.PostId,
            commentId: createLike.commentId,
            UserId: createLike.UserId,
            createdAt: createLike.createdAt,
            updatedAt: createLike.updatedAt
        }}; 




    // 3. 댓글 좋아요 취소 createLike
    deleteLike = async (postId, commentId, userId) => {
        const findPost = await this.postRepository.findPostById(postId)
        if(!findPost) {throw new Error('게시글이 존재하지 않습니다.')}
        else if (!userId) {throw new Error("로그인 후 이용해주세요.")}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if(!findComment) {throw new Error('댓글이 존재하지 않습니다.')}

        await this.commentLikeRepository.deleteLike(postId, commentId, userId)
        const deleteLike = await this.commentRepository.findCommentById(commentId)
        
        
        // 본인이 누른 좋아요만 취소가능하게 해야함

        return {
            likeId: deleteLike.likeId,
            PostId: deleteLike.PostId,
            commentId: deleteLike.commentId,
            UserId: deleteLike.UserId,
            createdAt: deleteLike.createdAt,
            updatedAt: deleteLike.updatedAt
        }}; 


}


module.exports = CommentLikeService;


