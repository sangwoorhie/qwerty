const express = require('express');
const router = express.Router();
const Authmiddleware = require("../middlewares/auth-middleware.js") //사용자인증 미들웨어 

// 위에서 대문자P로 컨트롤러 경로를 설정하고, 아래에서 소문자p로 함수실행.
const PostsController = require('../controllers/posts.controller.js')
const postsController = new PostsController();


// 소문자 p로 연결하고, 그 뒤 점찍고는 내 임의대로 씀. 그 임의대로 쓴 것은 연결된 controller 파일에서 함수식 만들때 사용됨.
// localhost:3000/api/posts
router.get('/', postsController.getPosts); // 게시글 목록조회
router.get('/:postId', postsController.getPostById); // 게시글 상세조회
router.post('/', Authmiddleware, postsController.createPost); // 게시글 생성
router.put('/:postId', Authmiddleware, postsController.updatePost); // 게시글 수정
router.delete('/:postId', Authmiddleware, postsController.deletePost); // 게시글 삭제


module.exports = router;
