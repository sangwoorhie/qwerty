const express = require('express');
const router = express.Router();


// 위에서 대문자U로 컨트롤러 경로를 설정하고, 아래에서 소문자u로 함수실행.
const UsersController = require('../controllers/users.controller')
const usersController = new UsersController();


// 소문자 p로 연결하고, 그 뒤 점찍고는 내 임의대로 씀. 그 임의대로 쓴 것은 연결된 controller 파일에서 함수식 만들때 사용됨.
// localhost:3000/api/users
router.post('/signup', usersController.signupUser); // 1.회원가입
router.post('/login', usersController.loginUser); // 2.로그인
router.get('/:userId', usersController.getUser); // 3.회원정보조회
router.patch('/:userId', usersController.updateUser); // 4.회원정보수정
router.delete('/:userId', usersController.deleteUser); // 5.회원탈퇴


module.exports = router;