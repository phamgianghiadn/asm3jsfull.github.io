"use strict";
if (currentUser) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", () => {
    if (validate()) {
   currentUser.setPageSize(inputPageSize.value);
   currentUser.setCategory(inputCategory.value);

   

      saveToStorage("currentUser", currentUser);

      // const index = useArrIn.findIndex(
      //   (item) => item.username === currentUser.username
      // );

      // useArrIn[index] = currentUser;
      // saveToStorage(KEY, useArrIn);

      alert(" cập nhật thành công");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
    console.log(currentUser.pageSize);
  });

  const validate = () => {
    let isValidate = true;
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("hãy nhập PageSize");
      isValidate = false;
    }

    if (inputCategory.value.trim() == "") {
      alert("hãy nhập Category");
      isValidate = false;
    }
    return isValidate;
  };
} else {
  alert("bạn cần đăng nhập hoặc tạo tài khoản");
  window.location.href = "../index.html";
}
