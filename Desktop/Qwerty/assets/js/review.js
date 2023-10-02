const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const postList = await fetch(`http://localhost:3000/${id}`, options).then((res) => res.json());
const sameResult = postList.same;

// 리뷰 생성, 수정

async function upload() {
    const content = $('#content').val();
    const ratings = $('input[name=radio]:checked').val();

    // 백엔드주소
    const response = await fetch(`http://localhost:3000/api/user/:${storeId}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, ratings }),
    });

    const result = await response.json();
    console.log(result.message);
    return alert(result.message);
}

// 뒤로가기 버튼
function back() {
    location.href = 'javascript:history.back();';
}
