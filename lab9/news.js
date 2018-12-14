var useLocalStorage = false;

function switchUseLS(){
  useLocalStorage = !useLocalStorage;
}

class News{
  constructor(body, picture){
    this.body = body;
    this.picture = picture;
  }
}
function isOnline() {
  return window.navigator.onLine;
}
const newsContainer = document.getElementById('content_news');

function newsTemplate(news) {
var body = news.body;
var picture = news.picture;


return `
<ul>
    <li class="col-sm-3" class="big" class="navbar-brand" style="color: black;text-decoration: none;list-style: none">
    <a href="#" >

        <img src="${picture}" width="100%">
        <br><br> 
        <p class="shrft">${body}</p>
        </a>
      </li>
      </ul>
`
}



function initAndRenderData(){
  if(useLocalStorage){
  const data = localStorage.getItem('news_data');

  if (!isOnline()) return;

  if (!data) {
    console.log('No available local data found');
  } else {
    JSON.parse(data).forEach(({ body, picture }) => {
  
        var tempNews = new News(body, picture);
        $('#content_news').append(
          newsTemplate(tempNews),
        );
    });
  }
  }
  else if (!isOnline()) return; 

  else {
    var openDB = indexedDB.open("news_data", 1);
    openDB.onupgradeneeded = function() {
        var db = openDB.result;
        var store = db.createObjectStore("news", {keyPath: "body"});
        store.createIndex("body", "body", { unique: false });
        store.createIndex("picture", "picture", { unique: false });
    }
    openDB.onsuccess = function(event) {
      var db = openDB.result;
      var tx = db.transaction("news", "readwrite");
        var store = tx.objectStore("news");
        store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
          var tempNews = new News(cursor.value.body, cursor.value.picture);

          $('#content_news').append(
            newsTemplate(tempNews),
          );
          cursor.continue();
        }
      };
        tx.oncomplete = function(){
          db.close();
        }
    }
  }
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
/*999*/