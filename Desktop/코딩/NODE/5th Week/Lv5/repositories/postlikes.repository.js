const { Posts, PostLikes } = require('../models') // DB에 접근

class PostLikeRepository {


// // 1.게시글 좋아요 조회 findPostById
// findPostById = async (postId) => {
//     const post = await PostLikes.findOne({where: {postId: postId}})
//     return post;
// }


// 2. 게시글 좋아요 생성 createLike
createLike = async (postId, userId) => {
    const createPostLike = await PostLikes.create({postId, userId})
    return createPostLike;
}


// 3. 게시글 좋아요 취소 deleteLike
deleteLike = async(postId, userId) => {
    const deletePostLike = await PostLikes.destroy({where: { postId, userId }});
    return deletePostLike;
}

};

module.exports = PostLikeRepository