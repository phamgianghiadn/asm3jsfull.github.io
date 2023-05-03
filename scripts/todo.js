"use strict";
if (currentUser) {
  const inputTask = document.getElementById("input-task");
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  // const checked = ;
  // const deletes =

  const displayTodoList = () => {
    let list = "";
    //lọc theo use đăng nhập, ai đăng nhập thì sẽ thêm list của người đó.
    const idAdd = todoArr.filter((item) => item.owner === currentUser.username);
    // lọc để thêm vào html
    idAdd.forEach((item) => {
      list += `<li class=${item.isDone ? "checked" : ""}>${
        item.task
      }<span class="close">×</span></li>`;
    });
    todoList.innerHTML = list;
    checkList();
    deletetodoArr();
  };
  displayTodoList();
  // bắt sựu kiện nút Add
  btnAdd.addEventListener("click", () => {
    if (inputTask.value.trim().length == 0) {
      alert("vui lòng nhập sự kiện");
    } else {
      //lấy dữ liệu từ todo
      const todo = new Task(inputTask.value, currentUser.username, false);
      // thêm todo vào todo
      todoArr.push(todo);
      // lưu vào loco
      saveToStorage("todoArr", todoArr);
      // Hiển thị lên trang
      displayTodoList();
      // trên input sẽ reset
      inputTask.value = "";
    }
  });
  function checkList() {
    document.querySelectorAll("#todo-list li").forEach(function (item) {
      item.addEventListener("click", function (abc) {
        // tránh cái nút X để xóa ra
        if (item.children[0] !== abc.target) {
          // kik vào để xóa hoặc gọi class cheked
          item.classList.toggle("checked");
          // tìm kiếm use nào sử dụng để lưu vào user đó
          const todos = todoArr.find(
            (todoitem) =>
              todoitem.owner === currentUser.username &&
              // lấy nội dung tex trong li dùng slice(0,-1) để lấy toàn bộ  phần text trừ <span>
              todoitem.task === item.textContent.slice(0, -1)
          );
          console.log(item.textContent.slice(0, -1));
          // tìm xem có chứa class checked không nếu có sẽ là true
          todos.isDone = item.classList.contains("checked") ? true : false;
          // lưu vào loco
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  // hàm khi kik vào dấu X để xóa
  function deletetodoArr() {
    // lấy tất cả các dấu X
    document.querySelectorAll("#todo-list .close").forEach(function (closeEL) {
      // duyệt qua từng phần tử để xóa
      closeEL.addEventListener("click", function () {
        // hỏi xem có muốn xóa hay không
        const isDelete = confirm("Bạn có chắc chắn muốn xóa");
        // nếu dồng ý xóa
        if (isDelete) {
          // dùng findIdex để loại bỏ các giá trị thỏa điều kiện
          const index = todoArr.findIndex(
            (dele) =>
              dele.owner === currentUser.username &&
              dele.task === closeEL.parentElement.textContent.slice(0, -1)
          );
          // loại bỏ nó
          todoArr.splice(index, 1);
          //lưu vào loco
          saveToStorage("todoArr", todoArr);
          // gọi lại hàm hiển thị
          displayTodoList();
        };
      });
    });
  }
} else {
  alert("bạn cần đăng nhập hoặc tạo tài khoản");
  window.location.href = "../index.html";
}
