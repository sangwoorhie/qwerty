const UserService = require('../services/users.service');
const UsersRepository = require('../repositories/users.repository');
const JsonWebToken = require("jsonwebtoken");


class UsersController {
    userService = new UserService();


    // 1. 회원가입 signupUser
    signupUser = async(req, res, next) => {
        const { email, password, confirmPassword, nickname, age, gender, profileImage } = req.body;
        const createUserData = await this.userService.signupUser(email, password, confirmPassword, nickname, age, gender, profileImage);
        res.status(201).json({data: createUserData, message: "회원가입이 완료되었습니다."});
    }


    // 2. 로그인 loginUser
    loginUser = async(req, res, next) =>{
        const { email, password } = req.body;
        const Login = await this.userService.loginUser(email, password);
        
        // 쿠키발급
        const Token = JsonWebToken.sign({ userId: Login.userId }, "customized-secret-key");
        res.cookie("Authorization", `Bearer ${Token}`);
        res.status(200).json({message: "로그인이 완료되었습니다."});
    }


    // 3. 회원조회 getUser
    getUser = async(req, res, next) => {
        const { userId } = req.params;
        const userInfo = await this.userService.findUserById(userId)
        res.status(200).json({data: userInfo});
    }


    // 4. 회원정보 수정 updateUser
    updateUser = async(req, res, next) => {
        const { userId } = req.params;
        const { nickname, password, confirmPassword, age, gender, profileImage } = req.body;
        const updateUserInfo = await this.userService.updateUser(userId, nickname, password, confirmPassword, age, gender, profileImage);
        res.status(200).json({data: updateUserInfo, message: "회원정보가 수정되었습니다."});
    }


    // 5. 회원탈퇴 deleteUser
    deleteUser = async(req, res, next) => {
        const { userId } = req.params;
        const { email, password } = req.body;
        const deleteUser = await this.userService.deleteUser(userId, email, password);
        res.status(200).json({data: deleteUser, message: "회원탈퇴가 완료되었습니다."});
    }
}


module.exports = UsersController;