// 테이블 행을 동적으로 생성하는 함수
function generateTableRows(dataArray) {
    const tableBody = document.querySelector("#menuTable tbody");
    tableBody.innerHTML = ""; // 기존의 행들을 삭제합니다.

    for (let i = 0; i < dataArray.length; i++) {
        const item = dataArray[i];

        const row = document.createElement("tr");

        const menuIdCell = document.createElement("td");
        menuIdCell.textContent = item.menuId;
        row.appendChild(menuIdCell);

        const menuNameCell = document.createElement("td");
        menuNameCell.textContent = item.menuName;
        row.appendChild(menuNameCell);

        const menuImageCell = document.createElement("td");
        menuImageCell.textContent = item.menuImage;
        row.appendChild(menuImageCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        const menuChangeCell = document.createElement("td");
        const changeBtn = document.createElement("button");
        changeBtn.textContent = "메뉴수정";
        changeBtn.onclick = () => menuChange(item.menuId, item.menuName, item.menuImage, item.price) // 수정 팝업창 열기
        menuChangeCell.appendChild(changeBtn);
        changeBtn.style.background = "#ff7f00";
        changeBtn.style.color = "#fff";
        changeBtn.style.borderRadius = "5px";
        changeBtn.style.transition = "0.7s";
        changeBtn.style.fontSize = "4px";
        changeBtn.style.cursor = "pointer";
        changeBtn.addEventListener('mouseover', function(){
            changeBtn.style.background = "#fff";
            changeBtn.style.color = "#ff7f00";
        });
        changeBtn.addEventListener('mouseout', function(){
            changeBtn.style.background = "#ff7f00";
            changeBtn.style.color = "#fff";
        });
        row.appendChild(menuChangeCell);

        const menuDeleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "메뉴삭제";
        deleteBtn.onclick = () => menuDelete(item.menuId); // 삭제 함수에 메뉴 아이디를 넘깁니다.
        menuDeleteCell.appendChild(deleteBtn);
        deleteBtn.style.background = "#f04";
        deleteBtn.style.color = "#fff";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.transition = "0.7s";
        deleteBtn.style.fontSize = "4px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener('mouseover', function(){
            deleteBtn.style.background = "#fff";
            deleteBtn.style.color = "#f04";
        });
        deleteBtn.addEventListener('mouseout', function(){
            deleteBtn.style.background = "#f04";
            deleteBtn.style.color = "#fff";
        });
        row.appendChild(menuDeleteCell);

        tableBody.appendChild(row);
    }
}

// table db 데이터 값 출력
const data = {
    email: $('#email'),
    password: $('#password'),
    confirm: $('#passwordConfirm'),
    storeName: $('#storeName'),
    storeImage: $('#storeImage'),
}

axios.get('http://localhost:3000/api/ceo/getMenuAll', data)
    .then(response => {
        console.log(response);

        const dataArray = response.data.data;
        generateTableRows(dataArray); // 테이블 행 생성 함수를 호출하여 데이터로 테이블을 업데이트합니다.

    })
    .catch(function (error) {
        console.log(error);
    })

// 메뉴 수정
function menuChange(menuId, menuName, menuImage, price) {
    const popup = document.getElementById("menuEditPopup");
    const form = document.getElementById("editMenuForm");

    // 팝업에 메뉴정보 채우기!
    document.getElementById("menuId").value = menuId;
    document.getElementById("menuName").value = menuName;
    document.getElementById("menuImagePreview").value = menuImagePreview;
    document.getElementById("price").value = price;

    popup.style.display = "block";
}
// 이미지
document.getElementById("menuImageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const previewImage = document.getElementById("menuImagePreview");
        previewImage.src = reader.result;
        previewImage.style.display = "block";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});
function closePopup() {
    const popup = document.getElementById("menuEditPopup");
    popup.style.display = "none";
}


// 메뉴 삭제
function menuDelete(menuId) {
    axios.delete(`http://localhost:3000/api/ceo/deleteMenu/${menuId}`)
    .then(request => {
        alert('음식 삭제 완료!');
        // API 요청이 성공하면 해당 행을 테이블에서 삭제합니다.
        const tableRow = document.getElementById(menuId);
        if (tableRow) {
            tableRow.remove(); // 해당 행을 테이블에서 삭제합니다.
        } else {
            console.log("행을 찾을 수 없습니다.");
        }
        window.location.reload();
    })
    .catch(function (error) {
        console.log(error);
    })
}

