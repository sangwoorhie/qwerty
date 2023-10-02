const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000

const router = require('./routes')

app.use(cookieParser());
app.use(express.json());
app.use(express.static("assets")); // assets이라는 폴더를 만들면 그 안에 폴더들은  html, css, js, 이미지 등 "정적 파일"에 대한 기본 경로를 제공해 준다
app.use(express.urlencoded({ extended: false })); // 즉 locathost:3018/index.html 브라우저에서 연결가능.
app.use('/api', router)

app.listen(port, () => {
    console.log(port, '포트로 서버가 연결되었습니다.')
})







// API

// POST: localhost:3000/api/users/signup // 회원가입 { email, password, confirmPassword, nickname, age, gender, profileImage } (성공)
// POST: localhost:3000/api/users/login  // 로그인 { email, password } (성공)
// GET: localhost:3000/api/users/:userId  // 회원조회 (성공)
// PATCH: localhost:3000/api/users/:userId  // 회원정보수정 { nickname, password, confirmPassword, age, gender, profileImage } (성공)
// DELETE: localhost:3000/api/users/:userId  // 회원탈퇴 { email, password }

// GET: localhost:3000/api/posts      // 게시글 목록조회 (성공)
// GET: localhost:3000/api/posts/:postId // 게시글 상세조회
// POST: localhost:3000/api/posts       //게시글 생성 { title, content }
// PUT: localhost:3000/api/posts/:postId // 게시글 수정 { title, content }
// DELETE: localhost:3000/api/posts/:postId  // 게시글 삭제

// POST: localhost:3000/api/posts/:postId/like   // 게시글 좋아요
// DELETE: localhost:3000/api/posts/:postId/like   // 게시글 좋아요 취소

// POST: localhost:3000/api/posts/:postId/report // 게시글 신고 { content }
// DELETE: localhost:3000/api/posts/:postId/report // 게시글 신고 취소

// GET: localhost:3000/api/posts/:postId/comments  // 댓글 조회
// POST: localhost:3000/api/posts/:postId/comments  // 댓글 생성 { comment }
// PUT: localhost:3000/api/posts/:postId/comments/:commentId  // 댓글 수정 { comment }
// DELETE: localhost:3000/api/posts/:postId/comments/:commentId  // 댓글 삭제

// POST: localhost:3000/api/posts/:postId/comments/:commentId/like // 댓글 좋아요 
// DELETE: localhost:3000/api/posts/:postId/comments/:commentId/like // 댓글 좋아요 취소

// POSt: localhost:3000/api/posts/:postId/comments/:commentId/report  // 댓글 신고 { content }
// DELETE: localhost:3000/api/posts/:postId/comments/:commentId/report  // 댓글 신고취소
























// app.js => routes => controller => services => repositories => DataBase

// 순서
// 1. 클라이언트가 Controller에게 요청(request)한다.
// 2. Controller는 Service에게 실제 비즈니스 로직에 대한 요청의 처리를 전달한다.
// 3. Service는 데이터베이스(DB)가 필요한 경우 저장소(Repository)에게 요청한다.
// 4. 저장소(Repository)는 DB의 연결, 해제, 자원 및 생성,수정,삭제,조회(CRUD)를 관리한다.
// 5. 저장소는 DB를 가져와 Service에 전달한다.
// 6. Service는 Controller에게 비즈니스 로직을 전달한다.
// 7. Controller는 모든 처리가 끝나면 클라이언트에게 응답(Response)한다.

// 클라이언트 => 컨트롤러 => 서비스 => 레파지토리 => DB