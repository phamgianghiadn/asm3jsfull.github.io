"use strict";
// const users = getFromStorage("useArr") ?? [];
//Lưu dữ liệu dưới LocalStorage

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, d) {
  return JSON.parse(localStorage.getItem(key)) ?? d;
}

const KEY = "USER_ARRAY";
const userArr = getFromStorage(KEY, []);

//lấy dữ liệu từ locostorage
const users = getFromStorage(KEY) ? getFromStorage(KEY) : [];
// console.log(users);

//chuyển đổi về dạng object class Instace
const useArrIn = users.map((user) => parseUser(user));
// sẽ trả về 1 mảng chứa các  instance của class usre

//Lấy dữ liệu đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

// lấy dữ liệu todo từ locostorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

//chuyển đổi về dạng object class Instace
const todoArr = todos.map((item) => parseTask(item));



function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    // phần số 9
    userData.pageSize,
    userData.category
  );

  return user;
}

function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);

  return task;
}
