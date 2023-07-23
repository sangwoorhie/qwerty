const express = require('express');
const router = express.Router();

// GET

// => localhost:3000/
// 1. 사장님, 고객님 메인페이지
router.route('/').get((req, res) => {
    return res.render('./index.html');
});

// => localhost:3000/ceo
// 2. 사장님 페이지
router.route('/ceo').get((req, res) => {
    return res.render('pages_ceo/ceo.html');
});

// => localhost:3000/ceoLogin
// 3. 사장님 로그인 페이지
router.route('/ceoLogin').get((req, res) => {
    return res.render('pages_ceo/ceoLogin.html');
});

// => localhost:3000/ceoPost
// 4. 사장님 포스트 페이지
router.route('/ceoPost').get((req, res) => {
    return res.render('pages_ceo/ceoPost.html');
});

// => localhost:3000/ceoSignup
// 5. 사장님 회원가입 페이지
router.route('/ceoSignup').get((req, res) => {
    return res.render('pages_ceo/ceoSignup.html');
});

module.exports = router;
