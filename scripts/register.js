"use strict";
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// const abc = new User('nghia','pham','nghiadn','12345');
// console.log(abc);


btnSubmit.addEventListener("click", () => {
  const usedata = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  const validate = isvalidate(usedata, inputPasswordConfirm.value);
  if (validate) {
    userArr.push(usedata);
    saveToStorage(KEY, userArr);
    alert('Đăng Ký Thành Công')
    window.location.href = "../pages/login.html";
  }
});
const isvalidate = (user, PasswordConfirm) => {
  let validate = true;
  // không để trống các ô
  if (user.firstName.trim() === "") {
    alert("hãy nhập Firstname");
    validate = false;
  }
  if (user.lastName.trim() === "") {
    alert("hãy nhập lastName");
    validate = false;
  }
  if (user.username.trim() === "") {
    alert("hãy nhập username");
    validate = false;
  }
  if (user.password.trim() === "") {
    alert("hãy nhập password");
    validate = false;
  }

  if (user.password.length < 8) {
    alert("password quá ngắn");
    validate = false;
  }
  
  if (user.password !== PasswordConfirm) {
    alert("PasswordConfirm và password không trùng nhau");
    validate = false;
  }
  const checkUserName = userArr.filter(
    (item) => item.username === user.username
  );
  // nếu không có phần tử  thì là 1 arr rỗng checkUserName.length = 0 = false;
  if (checkUserName.length) {
    alert("username bị trùng");
    validate = false;
  }
  return validate;
};
