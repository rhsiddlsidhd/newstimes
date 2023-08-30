let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getnewsbytopic(event))
);
let searchbutton = document.getElementById("search-button");
let url;
//각 함수에서 필요한 url을 만든다
//api호출 함수를 부른다

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "HAb-VwD8jA1lFdszL-lwITEkRTIlYrTwPo-eSBa-IQk",
    });
    url.searchParams.set("page", page); // &page=
    console.log("url은?", url);
    let response = await fetch(url, { headers: header }); //ajax ,http, fetch
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      console.log("받는 데이터가 뭐지?", data);
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;

      console.log(news);
      render();
      pagenation();
    } else {
      throw new Error(data.message);
    }

    render();
  } catch (error) {
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  getNews();
};

const getnewsbytopic = async (event) => {
  console.log("클릭됨", event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  //검색 키워드 읽어오기
  //url에 검색 키워드 붙이기
  //헤더준비
  //url 부르기
  //데이터 가져오기
  //데이터 보여주기

  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src="${item.media}"
        rel="안지영"
      />
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>
        ${item.summary}
      </p>
      <div>${item.rights}*${item.published_date}</div>
    </div>
  </div>`;
    })
    .join(""); // join 배열을 스트링으로 전환

  console.log(newsHTML);

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagenation = () => {
  let paginationHTML = ``;
  // total_page
  // page
  // page group
  let pageGroup = Math.ceil(page / 5);
  // last
  let last = pageGroup * 5;
  // first
  let first = last - 4;
  // first ~ last 페이지 프린트

  //(과제)
  // total page 3일경우 3개의 페이지만 프린트 하는법 last,first
  // << >> 이 버튼 만들어주기
  // 내가 그룹1 일때 << < 이 버튼이 없다
  // 내가 마지막 그룹일때 > >> 이 없다

  paginationHTML = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${
    page - 1
  })">
    <span aria-hidden="true">&lt;</span>
  </a>
</li>`;

  for (let i = first; i <= last; i++) {
    paginationHTML += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
  }

  paginationHTML += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${
    page + 1
  })">
    <span aria-hidden="true">&gt;</span>
  </a>
</li>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  // 이동하고 싶은 페이지를 알아야함
  page = pageNum;

  // 이동하고 싶은 페이지를 가지고 api를 다시 호출해주자
  getNews();
};

searchbutton.addEventListener("click", getNewsByKeyword);

getLatestNews();
