const users = [];
const addUser = ({ id, username, room }) => {
  username = username.trim();
  room = room.trim();

  if (!username || !room) {
    return {
      error: "사용자 이름과 방이 필요합니다.",
    };
  }

  // const existingUser = users.find((user) => {
  //   return user.room === room && user.username === username;
  // });
  // if (existingUser) {
  //   return {
  //     error: "사용자 이름이 현재 방에서 사용중입니다.",
  //   };
  // }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const getUsersInRoom = (room) => {
  room = room.trim();
  return users.filter((user) => user.room === room);
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const removeUser = (id) => {
  // 지우려고 하는 유저가 있는지 찾기
  const index = users.findIndex((user) => user.id === id);
  // 만약 있다면 지우기
  if (index !== -1) {
    return users.splice(index, 1)[0]; // 지워진 유저정보 리턴됨
  }
};

module.exports = {
  addUser,
  getUsersInRoom,
  getUser,
  removeUser,
};
