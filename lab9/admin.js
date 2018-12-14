var useLocalStorage = false;

function switchUseLS(){
  useLocalStorage = !useLocalStorage;
}

window.isOnline = () => this.navigator.onLine;


const input_form = document.getElementById('addPicture');
const newsForm = document.getElementById('newsForm')
const text = document.getElementById('text');
const picture_Input = document.getElementById('formForFile');


class News{
  constructor(body, picture){
    this.body = body;
    this.picture = picture;
  }
}

const onSubmitPress = (e) => {
  e.preventDefault();

  const isValid = (text.value.length > 0);
  input_form.classList.add('was-validated')
  newsForm.classList.add('was-validated');

  if (!isValid) return;

  var news = new News(text.value, picture_Input.value);

  if (!isOnline()) {
    writeLocally(news);
  } else {
    console.log('Емуляція запиту до сервера...');
  }

  input_form.reset();
  newsForm.reset();

  alert('Вашу новину додано!');
}


function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#example_picture').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
};

$("#formForFile").change(function() {
  readURL(this);
});

function getNews() {
    var news = new Array;
    var news_item = localStorage.getItem('news_data');
    if (news_item !== null) {
        news = JSON.parse(news_item); 
    }
    return news;
}

function writeLocally(newsItem) {
  if(useLocalStorage){
    var news = getNews();
      news.push(newsItem);
      localStorage.setItem('news_data', JSON.stringify(news));
      return false;
  } 
  else{
    var openDB = indexedDB.open("news_data", 1);

    openDB.onerror = function(event) {
      alert("Error occurred when loading news");
    };
    openDB.onupgradeneeded = function() {
        var db = openDB.result;
        var store = db.createObjectStore("news", {keyPath: "body"});
        store.createIndex("body", "body", { unique: false });
        store.createIndex("picture", "picture", { unique: false });
    };
    openDB.onsuccess = function(event) {
      var db = openDB.result;
      var tx = db.transaction(["news"], "readwrite");
      var store = tx.objectStore("news");
      var addFeedback = store.put(newsItem);
      addFeedback.onsuccess = function(event){
      }
      addFeedback.onerror = function(event){
        alert("Error occurred when loading news");
      }
      tx.oncomplete = function(){
        db.close();
      }
    };
  }
};


const addButton = document.getElementById('submit-btn');
addButton.onclick = onSubmitPress;