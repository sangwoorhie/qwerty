function signUp() {
    const email = $('#inputEmail').val();
    const verifyNumberInput = $('#inputVerifyNumber').val();
    const password = $('#inputPassword').val();
    const passwordConfirm = $('#inputPasswordConfirm').val();

    axios
        .post('/api/user/signup', {
            email: email,
            verifyNumber: verifyNumberInput,
            password: password,
            confirmPassword: passwordConfirm,
        })
        .then(function () {
            customAlert('회원가입을 축하드립니다!', function () {
                window.location.replace('/');
            });
        })
        .catch(function () {
            customAlert('회원가입에 실패했습니다.');
        });
}

function customAlert(text, confirmCallback) {
    $('#alertText').text(text);
    $('#alertModal').modal('show');
    if (confirmCallback) {
        $('#alertModal .btn-confirm').click(confirmCallback);
    }
}

function emailSenderHandler() {
    try {
        const email = $('#inputEmail').val();
        console.log(email);
        const verifyNumber = emailSender.sendGmail(email);
        console.log('전송 성공');
        return verifyNumber;
    } catch {
        console.log('전송 실패');
    }
  }
