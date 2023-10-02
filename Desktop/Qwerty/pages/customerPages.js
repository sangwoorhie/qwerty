const express = require('express');
const router = express.Router();

// GET
// => localhost:3000/storeSearch
// 1. 고객이 가게를 검색해서 찾는 페이지. 검색창이랑 가게 이미지, 이름등이 올라와있다.
router.route('/storeSearch').get((req, res) => {
  return res.render('./pages_customer/storeSearch.html');
});

// => localhost:3000/user/register
// 2. 고객 회원가입 페이지
router.route('/user/register').get((req, res) => {
  return res.render('pages_customer/register.html');
});

// => localhost:3000/customerLogin
// 3. 고객 로그인페이지
router.route('/user/login').get((req, res) => {
  return res.render('pages_customer/login.html');
});

// => localhost:3000/cart
// 4. 고객이 음식 메뉴를 선택한것들이 모여있는 장바구니 페이지
router.route('/cart').get((req, res) => {
  return res.render('pages_customer/cart.html');
});

// => localhost:3000/store
// 5. 가게 한개의 상세 페이지, 상단에는 메뉴들이 있고, 하단에는 가게 리뷰가 달려있다.
router.route('/store').get((req, res) => {
  return res.render('pages_customer/store.html');
});

// => localhost:3000/order
// 6. 고객 주문 페이지 (실제 결제가 이뤄지는 곳)
router.route('/order').get((req, res) => {
  return res.render('pages_customer/order.html');
});

// => localhost:3000/review
// 7. 고객이 가게에 대한 리뷰를 남기는 페이지.
router.route('/review/write').get((req, res) => {
  return res.render('pages_customer/reviewWrite.html');
});

// => localhost:3000/user/review
// 8. 리뷰 목록페이지
router.route('/review').get((req, res) => {
  return res.render('pages_customer/review.html');
});

// => localhost:3000/user/review/:reviewId
// 9. 리뷰 상세페이지
router.route('/review/detail').get((req, res) => {
  return res.render('pages_customer/reviewDetail.html');
});

module.exports = router;
