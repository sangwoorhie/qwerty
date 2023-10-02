const UsersRepository = require('../repositories/users.repository');
const JsonWebToken = require("jsonwebtoken");


// 레파지토리에 데이터를 요청.
class UserService {
    userRepository = new UsersRepository();


    // 1. 회원가입 signupUser
    signupUser = async (email, password, confirmPassword, nickname, age, gender, profileImage) => {
        const createUserData = await this.userRepository.signupUser(email, password, nickname, age, gender, profileImage);
            
        const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 정규식
        const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;  // 비밀번호 정규식 (최소 4자 이상의 영문 대소문자 및 숫자)
            
        if (!email) throw new Error('이메일을 입력해주세요.');
        else if (!password) throw new Error('비밀번호를 입력해주세요.');
        else if (!confirmPassword) throw new Error('확인 비밀번호를 입력해주세요.');
        else if (!nickname) throw new Error('닉네임을 입력해주세요.');
        else if (!age) throw new Error('나이를 입력해주세요.');
        else if (!gender) throw new Error('성별을 입력해주세요.');
        else if (!profileImage) throw new Error('프로필 이미지를 업로드해주세요.');
        else if (password !== confirmPassword) throw new Error('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        else if (!passwordCheck.test(password)) throw new Error('비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다.');
        else if (!emailCheck.test(email)) throw new Error('이메일 형식이 올바르지 않습니다.');
        else if (password.includes(nickname)) throw new Error('비밀번호에 닉네임을 포함해서는 안 됩니다.');
        // else if (createUserData.email == email) throw new Error('이미 존재하는 이메일입니다.');
        // else if (createUserData.nickname == nickname) throw new Error('이미 존재하는 닉네임입니다.');
        

        return {
            userId: createUserData.userId,
            email: createUserData.email,
            password: createUserData.password,
            nickname: createUserData.nickname,
            age: createUserData.age,
            gender: createUserData.gender,
            profileImage: createUserData.profileImage,
            createdAt:createUserData.createdAt,
            updatedAt:createUserData.updatedAt
            }};
            


    // 2. 로그인 loginUser
    loginUser = async(email, password) => {
        const loginData = await this.userRepository.findByEmail(email, password)

        if (!email) throw new Error('이메일을 입력해주세요.');
        else if (!password) throw new Error('비밀번호를 입력해주세요.');
        else if (loginData.email !== email) throw new Error('이메일이 일치하지 않습니다.');
        else if (loginData.password !== password) throw new Error('비밀번호가 일치하지 않습니다.');
        else if (!loginData.email) throw new Error('존재하지 않는 이메일입니다.');
        
        // const Token = `Bearer` + JsonWebToken.sign({ userId: loginData.userId }, "customized-secret-key");

        // return Token;
        return {
            email: loginData.email,
            password: loginData.password
        }
            // Token: Token
            // }};
    }

    // 토큰값. res.cookie는 controller에서 함
    // token = async(Token) => {
    //     const Token = JsonWebToken.sign({ userId: loginData.userId }, "customized-secret-key");
    //     return Token
    //     };
           


    // 3. 회원 조회 findUserById
    findUserById = async(userId) => {
        const findUser = await this.userRepository.findUserById(userId) // 레파지토리에서 userId정보를 찾음
        if(!findUser) throw new Error('회원정보가 존재하지 않습니다.');
            
        return {
            userId:findUser.userId,
            email:findUser.email,
            nickname:findUser.nickname,
            age:findUser.age,
            gender:findUser.gender,
            profileImage:findUser.profileImage,
            createdAt:findUser.createdAt,
            updatedAt:findUser.updatedAt
            }};
    
    

    // 4. 회원정보 수정 updateUser
    updateUser = async(userId, nickname, password, confirmPassword, age, gender, profileImage) => {
        const findUser = await this.userRepository.findUserById(userId)

        // 비밀번호 정규식 (최소 4자 이상의 영문 대소문자 및 숫자)
        const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/; 

        if (!findUser) throw new Error('회원정보가 존재하지 않습니다.');
        else if (!userId) throw new Error('로그인 후 이용할 수 있는 기능입니다.');
        else if (!password) throw new Error('비밀번호를 입력해주세요.');
        else if (!confirmPassword) throw new Error('확인 비밀번호를 입력해주세요.');
        else if (!nickname) throw new Error('닉네임을 입력해주세요.');
        else if (!age) throw new Error('나이를 입력해주세요.');
        else if (!gender) throw new Error('성별을 입력해주세요.');
        else if (!profileImage) throw new Error('프로필 이미지를 업로드해주세요.');
        else if (password !== confirmPassword) throw new Error('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        else if (!passwordCheck.test(password)) throw new Error('비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다.');
        else if (password.includes(nickname)) throw new Error('비밀번호에 닉네임을 포함해서는 안 됩니다.');

        await this.userRepository.updateUser(userId, nickname, password, age, gender, profileImage)
        const updateUser = await this.userRepository.findUserById(userId);
        
        return {
            userId: updateUser.userId,
            email: updateUser.email,
            password: updateUser.password,
            nickname: updateUser.nickname,
            age: updateUser.age,
            profileImage: updateUser.profileImage,
            createdAt: updateUser.createdAt,
            updatedAt: updateUser.updatedAt
            }};
    


    
    // 5. 회원 탈퇴 deleteUser
    deleteUser = async(userId, email, password) => {
        const findUser = await this.userRepository.findUserById(userId);
        if(!findUser) throw new Error('회원정보가 존재하지 않습니다.');
        else if(!userId) throw new Error('로그인 후 이용할 수 있는 기능입니다.');
        else if(!email) throw new Error('이메일을 입력해주세요.');
        else if(!password) throw new Error('비밀번호를 입력해주세요.');
        else if(password !== findUser.password) throw new Error('비밀번호가 일치하지 않습니다.');
        else if(email !== findUser.email) throw new Error('이메일이 일치하지 않습니다.');
            
        await this.userRepository.deleteUser(userId, email, password);

        return{
            userId: findUser.userId,
            email: findUser.email,
            password: findUser.password,
            nickname: findUser.nickname,
            age: findUser.age,
            profileImage: findUser.profileImage,
            createdAt: findUser.createdAt,
            updatedAt: findUser.updatedAt
            }};
    

}

/////




module.exports = UserService;