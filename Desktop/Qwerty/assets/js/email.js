const nodemailer = require('nodemailer');

require('dotenv').config();

const emailSender = {
    sendGmail: (email) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const min = 100000;
        const max = 999999;
        const verifyNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        transporter.sendMail({
            from: config.user,
            to: toReceiver,
            subject: '[쿼리의 민족] 반갑습니다! 인증번호를 보내드립니다.',
            text: `우측의 6자리 인증번호를 '인증번호 입력란'에 입력해주세요! => ${verifyNumber}`,
        });

        return verifyNumber;
    },
};

module.exports = emailSender;
