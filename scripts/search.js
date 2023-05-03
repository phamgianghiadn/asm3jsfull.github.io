"use strict";
if (currentUser) {
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  const navPageNum = document.getElementById("nav-page-num");

  const newsContainer = document.getElementById("news-container");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  let endPage = 0;
  let keyword = "";
  //mới vào thì không có các nút chuyển trang
  navPageNum.style.display = "none";
 
  btnSubmit.addEventListener("click", () => {
    // đầu tiên vào thì newsContainer chưa có dữ liệu
    newsContainer.innerHTML = "";
    pageNum.textContent = "1";

    if (inputQuery.value.trim().length == 0) {
      navPageNum.classList.remove = "hide";
      alert("vui lòng nhập từ khóa để tìm kiếm");
    } else {
   
      keyword === inputQuery.value;
      
      // gọi hàm ra
      getDataSeach(inputQuery.value, 1);
      
    }
  });

  // lấy dữ liệu API
  async function getDataSeach(keyword, page) {
    // vì là bất đồng bộ nên dùng await để đợi đọc hết dữ liệu

    const res = await fetch(
      // everything tìm tất cả từ khóa có liên quan.sortby=relevancy sắp xếp
      `https://newsapi.org/v2/everything?q=${keyword}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=f104fea2e38d4717813de17b29648990`
    );
    const data = await res.json();
    if (data.totalResults == 0) {
      navPageNum.style.display = "none";
      alert(
        `không có thông tin về từ khóa ${keyword} vui lòng nhập từ khóa khác `
      );
    }
    navPageNum.style.display = "block";
    displayNewList(data);
  }

  const displayNewList = (data) => {
    endPage = data.totalResults;
    hidenBtnPrev();
    hidenBtnNex();

    let html = "";
    console.log(data);
    data.articles.forEach((article) => {
      html += `<div class="new-content">
              <div class="img-banner">
                <img src=${
                  article.urlToImage
                    ? article.urlToImage
                    : "https://thuemaychuao.net/wp-content/uploads/2021/10/img.gif"
                } />
              </div>
              <div class = "content">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
              <button><a href=${article.url} target="_blank"> View</a></button>
              </div>
            </div>`;
    });
    newsContainer.innerHTML = html;
  };

  // điều kiện khi previos ẩn
  const hidenBtnPrev = () => {
    // khi trang 1 thì không cần Prev
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  };

  //// điều kiện khi next ẩn khi không còn trang nào để tìm nữa
  const hidenBtnNex = () => {
    // khi trang 1 thì không cần Prev
    //Math.ceil làm tròn số lên
    if (pageNum.textContent == Math.ceil(endPage / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  };

  // bắt sựu kiện khi nhấn vào nút Next
  btnNext.addEventListener("click", () => {
    getDataSeach(inputQuery.value, ++pageNum.textContent);
  });

  //bắt sựu kiện khi nhấn vào nút Prev
  btnPrev.addEventListener("click", () => {
    getDataSeach(inputQuery.value, --pageNum.textContent);
  });
} else {
  alert("bạn cần đăng nhập hoặc tạo tài khoản");
  window.location.href = "../index.html";
}
