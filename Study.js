let news = [];

const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  let header = new Headers({
    "x-api-key": "HAb-VwD8jA1lFdszL-lwITEkRTIlYrTwPo-eSBa-IQk",
  });

  let response = await fetch(url, { headers: header }); //ajax ,http, fetch
  let data = await response.json();
  console.log("this is data", data);
  news = data.articles;
  console.log(news);

  render();
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

getLatestNews();
