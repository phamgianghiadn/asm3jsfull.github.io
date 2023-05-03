"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

btnLogin.addEventListener("click", () => {
  const validate = isValidate();
  if (validate) {
    //tìm kiếm thông tin của người dùng cả pas và use đều phải trùng nhau
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    //nếu user true thì puzz vào locco còn ko báo lỗi
    if (user) {
      alert(" Đăng nhập thành công");
      saveToStorage("currentUser", user);
      window.location.href = "../index.html";
    } else {
      alert("Đăng nhập không thành công vui lòng kiêm tra lại");
    }
  }
});

const isValidate = () => {
  const validate = true;
  if (inputUsername.value.trim() == "") {
    alert(" hãy nhập usename");
    validate = false;
  }
  if (inputPassword.value.trim() == "") {
    alert(" hãy nhập Password");
    validate = false;
  }
  return validate;
};
