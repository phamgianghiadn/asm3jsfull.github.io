'use strict'
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');




// hiển thị tên người dùng đăng nhập hay chưa đăng nhập
 const displayHome=()=>{
//nếu có người đăng nhập thì ẩn Login và hiện content
if(currentUser){
  //ẩn login
  loginModal.style.display = "none";
  //hiển thị content
  mainContent.style.display = "block";
// thay đổi content
mainContent.textContent = `chào Mừng ${currentUser.username} `;
}else{
   //hiển thị login
   loginModal.style.display = "block";
   //ẩn content
   mainContent.style.display = "none";
}
 }
displayHome();
 // bắt sự kiện kho nhấn vào nút logout
 btnLogout.addEventListener("click",()=>{
const logout = confirm('Bạn có chắc chắc muốn đăng xuất')
if(logout){
  // nếu đồng ý logout thì sẽ trả về giá trị null
  currentUser = null;
  // nếu nul thì sẽ lưu vào currentUser với giá trị null
  saveToStorage("currentUser", currentUser);
// sau đó sẽ chạy  vào phần else
displayHome();
}
 })