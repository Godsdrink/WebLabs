function isOnline() {
    return window.navigator.onLine;
}


const newsContainer = document.getElementById('content_news');

const itemTemplate = (body, picture) => `
    <li class="col-sm-2" class="big" class="navbar-brand" style="color: black;text-decoration: none;list-style: none">
    <a href="#" >

        <img src="${picture}" width="100%">
        <br><br>
        <p class="shrft">${body}</p>
        </a>
      </li>
`


const initAndRenderData = () => {
  const data = localStorage.getItem('news_data');

  if (!isOnline()) return;

  if (!data) {
    console.log('No available local data found');
  } else {
    JSON.parse(data).forEach(({body, picture }) => {
        console.log(body);
        $('#news').append(
          itemTemplate(body, picture),
        );
    });
  }
}

const onOnline = () => {
  console.log('Network status: online');
}

const onOffline = () => {
  console.log('Connection lost');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);
