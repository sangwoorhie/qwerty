// 1. login
function login() {
    const data = {
        email: $('#email').val(),
        password: $('#password').val(),
    }
    axios.post('http://localhost:3000/api/ceo/login', data)
    .then(response => {
        console.log(data);
        alert('사장님 어서오세요');
        location.href = './ceo.html';
    
    })
    .catch(error => {
        alert('회원이 아닙니다'); // 로그인 실패 시 얼럿 메시지 표시
        console.log(error);
    });
};

/* =========================================================== */
// 2. signUp
function signUp() {
    const data = {
        email: $('#email').val(),
        password: $('#password').val(),
        confirm: $('#passwordConfirm').val(),
        storeName: $('#storeName').val(),
        storeImage: $('#storeImage').val()
    }
    console.log(data)
    axios.post('http://localhost:3000/api/ceo/signup', data)
    .then(response =>{
        // 회원가입 성공 시
        alert('회원가입이 완료되었습니다. 사장님!');
        location.href = './ceo.html';
    })
    .catch(function (error) {
        alert('회원가입에 실패하였습니다. 다시 돌아가주세요^^');
        location.href = './ceoSignup.html';
    })
}

/* =========================================================== */
// 3. 전체 회원 GET
const data = {
    email: $('#email').val(),
    password: $('#password').val(),
    confirm: $('#passwordConfirm').val(),
    storeName: $('#storeName').val(),
    storeImage: $('#storeImage').val()
};

console.log(data);

// API 요청 보내기
axios.get('http://localhost:3000/api/storeInfoList', { params: data })
    .then(response => {
        const formattedData = JSON.stringify(response.data, null, 2);
        document.getElementById("loginInfo").innerHTML = formattedData;
    })
    .catch(error => {
        console.log(error);
    });

/* =========================================================== */
// 4. logout
function logout() {
    try {
        axios.post('http://localhost:3000/api/ceo/logout')
            .then(response => {
                alert('사장님!!!!! 살펴가십쇼!!');
            })
    } catch (error) {
        console.log(error);
    }
}