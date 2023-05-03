"use strict";
if (currentUser) {
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  const newsContainer = document.getElementById("news-container");

  let endPage = 0;
  // lấy dữ liệu API
  async function getDataNews(country, page) {
    // vì là bất đồng bộ nên dùng await để đợi đọc hết dữ liệu
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=f104fea2e38d4717813de17b29648990`
    );
    const data = await res.json();

    displayNewList(data);
  }
  getDataNews(
    "us",
    currentUser.category,
    currentUser.pageSize,
    pageNum.textContent
  );

  const displayNewList = (data) => {
    endPage = data.totalResults;
    hidenBtnPrev();
    hidenBtnNex();

    let html = "";
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
    console.log(endPage);
  };

  // bắt sựu kiện khi nhấn vào nút Next
  btnNext.addEventListener("click", () => {
    getDataNews("us", ++pageNum.textContent);
  });

  //bắt sựu kiện khi nhấn vào nút Prev
  btnPrev.addEventListener("click", () => {
    getDataNews("us", --pageNum.textContent);
  });
} else {
  alert("bạn cần đăng nhập hoặc tạo tài khoản");
  window.location.href = "../index.html";
}
