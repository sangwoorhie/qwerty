// 서비스 계층 = 비즈니스 로직 계층. 아키텍쳐의 핵심 비즈니스로직을 수행하고 클라이언트가 원하는 요구사항 구현.
// 데이터가 필요할때 저장소(Repository)에게 데이터 요청

const PostRepository = require('../repositories/posts.repository');


class PostService {
    postRepository = new PostRepository();


    // 1. 게시글 목록조회 findAllPost
    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();
        
        allPost.sort ((a, b) => { return b.createdAt - a.createdAt});
        return allPost.map((post) => { // 새로운배열로 만듦
            return {
                postId: post.postId,
                title: post.title,
                createdAt : post.createdAt,
                updatedAt: post.updatedAt
            }}
        )};

            

    // 2. 게시글 상세조회 findPostById 
    findPostById = async (postId) => {
        const findPost = await this.postRepository.findPostById(postId);
        if(!findPost) throw new Error('게시글이 존재하지 않습니다.');

        return {
            postId:findPost.postId,
            userId:findPost.userId,
            title:findPost.title,
            nickname:findPost.nickname,
            likes:findPost.likes,
            content:findPost.content,
            createdAt:findPost.createdAt,
            updatedAt:findPost.updatedAt
        }};
    


    // 3. 게시글 생성 createPost
    createPost = async (userId, title, content) => {
        const createPostData = await this.postRepository.createPost(userId, title, content);
        if(!userId) throw new Error('로그인 후 이용할 수 있는 기능입니다.');
        else if (!title) throw new Error('제목을 입력해주세요.');
        else if (!content) throw new Error('내용을 입력해주세요.');

        return {
            postId: createPostData.postId,
            userId: createPostData.userId,
            title: createPostData.title,
            content: createPostData.content,
            createdAt: createPostData.createdAt,
            updatedAt: createPostData.updatedAt
        }};



    // 4. 게시글 수정 updatePost 
    updatePost = async (userId, postId, title, content) => {
        const findPost = await this.postRepository.findPostById(postId);
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.")
        else if (!userId) throw new Error("게시글 수정 권한이 없습니다.")
        else if (!title) throw new Error("제목을 입력해주세요.")
        else if (!content) throw new Error("내용을 입력해주세요.")

        await this.PostRepository.updatePost(title, content)
        const updatePost = await this.postRepository.findPostById(postId);
        return {
            postId: updatePost.postId,
            userId: updatePost.userId,
            title: updatePost.title,
            content: updatePost.content,
            createdAt: updatePost.createdAt,
            updatedAt: updatePost.updatedAt
        }};



    // 5. 게시글 삭제 deletePost 
    deletePost = async (userId, postId) => {
        const findPost = await this.postRepository.findPostById(postId);
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.")
        else if(!userId) throw new Error("게시글 삭제 권한이 없습니다.")

        await this.postRepository.deletePost(postId);

        return {
            postId: findPost.postId,
            userId: findPost.userId,
            title: findPost.title,
            content: findPost.content,
            createdAt: findPost.createdAt,
            updatedAt: findPost.updatedAt
        }};
    }


module.exports = PostService