const JsonWebToken = require('jsonwebtoken');
const { Users } = require('../models')

module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;
    const { TokenType, Token } = ( Authorization ?? "" ).split(" ")
    if(TokenType !== "Bearer"){
        res.status(403).json({message: "토큰 타입이 일치하지 않습니다."})
    } else if (!Token) {
        res.status(404).json({message: "토큰이 존재하지 않습니다."})
    }

    try{
        const DecodedToken = JsonWebToken.verify(Token, "customized-secret-key")
        const UserId = DecodedToken.userId;
        const user = await Users.findOne({where: {userId}}) // Users모델에서 일치하는 userId 컬럼값 갖고옴
    
        if(!user || !UserId){
            return res.status(404).json({message: "토큰에 해당하는 사용자가 존재하지 않습니다."})
        }
        res.locals.user = user;
        next();
    }catch(error){
        console.log(error)
        return res.status(401).json({message: "비정상적인 접근입니다."})
    }
};

