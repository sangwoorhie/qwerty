const express = require('express');
const router = express.Router();

const usersRouter = require('./users.routes.js') // 1.회원가입, 2.로그인, 3.회원정보조회, 4.회원탈퇴
const PostsRouter = require('./posts.routes.js') // 1.게시글생성, 2.게시글상세조회(+좋아요조회), 3.게시글목록조회(+좋아요조회), 4.게시글수정, 5.게시글삭제
const PostlikesRouter = require('./postlikes.routes.js') // 1.게시글 좋아요생성, 2.게시글 좋아요취소
const PostReportRouter = require('./postreport.routes.js') // 1.댓글신고 생성, 2.댓글신고 삭제
const commentsRouter = require('./comments.routes.js') // 1.댓글생성, 2.댓글조회(+좋아요조회), 3.댓글수정, 4.댓글삭제
const commentlikesRouter = require('./commentlikes.routes.js')  // 1.댓글 좋아요생성, 2.댓글 좋아요삭제
const commentReportRouter = require('./commentreport.routes.js')  // 1.댓글신고 생성, 2.댓글신고 삭제

router.use('/users', [usersRouter])
router.use('/posts', [PostsRouter, PostlikesRouter])
router.use('/posts/:postId/comments', [commentsRouter, commentlikesRouter])
router.use('/posts/:postId/report', [PostReportRouter])
router.use('/posts/:postId/comments/:commentId/report', [commentReportRouter])

module.exports = router;



// API

// POST: localhost:3000/api/users/signup // 회원가입 { email, password, confirmPassword, nickname, age, gender, profileImage } (성공)
// POST: localhost:3000/api/users/login  // 로그인 { email, password }
// GET: localhost:3000/api/users/:userId  // 회원조회
// PATCH: localhost:3000/api/users/:userId  // 회원정보수정 { nickname, password, confirmPassword, age, gender, profileImage }
// DELETE: localhost:3000/api/users/:userId  // 회원탈퇴 { email, password }

// GET: localhost:3000/api/posts      // 게시글 목록조회
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

