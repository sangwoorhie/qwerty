const { Users } = require('../models') // DB에 접근

class UsersRepository {


    // 1. 회원가입 signupUser
    signupUser = async (email, password, nickname, age, gender, profileImage) => {
        const CreateUserAccount = await Users.create({
            email, 
            password, 
            nickname, 
            age, 
            gender: gender.toUpperCase(), //성별 대문자로
            profileImage
        });
        return CreateUserAccount;
    }



    // 2. 로그인 findByEmail
    findByEmail = async (email, password) => {
        const user = await Users.findOne({ where: {email: email, password: password} });
        return user;
    }



    // 3. 회원 조회 findUserById
    findUserById = async (userId) => {
        const user = await Users.findByPk(userId) // Primary Key로 찾기
        return user;
    }



    // 4. 회원정보 수정 
    updateUser = async (userId, nickname, password, age, gender, profileImage) => {
        const UpdateUserData = await Users.update(
            { nickname, password, age, gender, profileImage },
            { where: {userId}}
        )
        return UpdateUserData;
    }


    
    // 5. 회원 탈퇴
    deleteUser = async (userId, email, password) => {
        const DeleteUserData = await Users.destroy({ where: { userId, email, password }});
        return DeleteUserData;
    }
    
};


module.exports = UsersRepository

// 컨트롤러 = 로직x
// 서비스 = 
// 유효성검사 2가지로 나뉨
// 디비에 있는지 확인 => 레파지토리에서 이뤄져야함