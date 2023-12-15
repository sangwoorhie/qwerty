const socket = io();

const query = new URLSearchParams(location.search); // '?username=John&room=Roomy'

const username = query.get("username");

const room = query.get("room");

// callback함수 => error메시지는 index.js
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });

  document.querySelector("#sidebar").innerHTML = html;
});

const messages = document.querySelector("#messages");
const messageTemplate = document.querySelector("#message-template").innerHTML;
socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createAt: moment(message.createdAt).format("h:mm a"), // moment.js 라이브러리
  });
  messages.insertAdjacentHTML("beforeend", html);
  scrollToBottom();
});

// 스크롤 올려주는 함수
function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

const messageForm = document.querySelector("message-form");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value; // 메시지 내용

  socket.emit("sendMessage", message, (error) => {
    messageFormButton.removeAttribute("disabled");
    messageFormInput.value = "";
    messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
  });
});
