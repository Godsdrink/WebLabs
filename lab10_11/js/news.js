var useLocalStorage = false;

function switchUseLS(){
  useLocalStorage = !useLocalStorage;
}

window.isOnline = () => this.navigator.onLine;
const getById = (id) => document.getElementById(id);

// REST
class ServerService {
  async sendToServer(data) {
    try {
      await fetch('/news', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Cannot fetch data: ', error);
    }
  }

 async getFromServer() {
    try {
      const data = await fetch('/news/all');
      return data.text();
    } catch (error) {
      console.error('Cannot fetch data: ', error);
    }
  }
}
//

const newsContainer = getById('content_news');

class News{
  constructor(body, picture){
    this.body = body;
    this.picture = picture;
  }
}

function newsTemplate(news) {

var body = news.body;
var picture = news.picture;
var button = document.createElement('input');

button.type  = 'button';
button.addEventListener('click', function() {
    alert(add);
}, false);

return `
    <div id="content_wrapper_news">
      <div href="#" class="news_table">
        <img src="${picture}" >
        <h1>${body}</h1>
      <br>
      </div>
`
}

function myFunction() {
  if(useLocalStorage){
    localStorage.clear();
    alert("Вашу новину видалено успішно!");
    location.reload();
    show();
  }
  else {
      window.indexedDB.deleteDatabase("news_data");
      location.reload();
      show();
  }
}


//REST
const service = new ServerService();

const initAndRenderData = async () => {
  const items = await service.getFromServer();
  console.log(items);

  const itemsStringified = JSON.stringify(items);

  JSON.parse(items).forEach(({body, picture }) => {
         var tempNews = new News(body, picture);
         $('#content_news').append(
           newsTemplate(tempNews),
         );
   });
}

const onOnline = () => {
  initAndRenderData();
  console.log('Network status: online');
}

const onOffline = () => {
  console.log('Connection lost');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);

