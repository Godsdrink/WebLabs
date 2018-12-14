
  
var useLocalStorage = false;
function switchUseLS(){
  useLocalStorage = !useLocalStorage;
}

function isOnline() {
    return window.navigator.onLine;
}

const namearea = document.getElementById('name');
const textarea = document.getElementById('text');

class Comit{
  constructor(name, text, date, time){
    this.name = name;
    this.text = text;
    this.date = date;
    this.time = time;
  }
}

function feedbackTemplate(feedback) { 
var name = feedback.name;
var text = feedback.text;
var date = feedback.date;
var time = feedback.time;

return  ` 
    <div class="container" style="border-bottom: 2px solid black;text-align: center;font-size:2em;" >
        <br>
        <p>
        <br>
        ${text}
        </p>
        <br>
        <span class="review-date" style="float:left">${date}, ${time}</span>
        <span class="review-author" style="float:right">${name}</span>
    </div>
    <div class="divider"></div>
`
}
const initAndRenderData = () => {
  if (!isOnline()) return;
  if(useLocalStorage){
  const data = localStorage.getItem('feedbacks-data');

  if (!data) {
    console.log('No local data');
  } else 
    JSON.parse(data).forEach(({ name, text, date, time }) => {
        $('#container').prepend(
        feedbackTemplate(name, text, date, time),
        );
    });
  
}else {
  var openDB = indexedDB.open("feedbacks-data", 1);
  openDB.onupgradeneeded = function() {
      var db = openDB.result;
      var store = db.createObjectStore("comit", {keyPath: "name"});
      store.createIndex("name", "name");
      store.createIndex("text", "text");
      store.createIndex("date", "date");
      store.createIndex("time", "time");
  }
  openDB.onsuccess = function(event) {
    var db = openDB.result;
    var tx = db.transaction("comit", "readwrite");
      var store = tx.objectStore("comit");
      store.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;

      if (cursor) {
        var tempFeed = new Comit(cursor.value.name, cursor.value.text, cursor.value.date, cursor.value.time);
          
          $('#container').prepend(feedbackTemplate(tempFeed));
          cursor.continue();
      }
    };
      tx.oncomplete = function(){
        db.close();
      }
  }
}
}



function writeInto(feedback){
  if(useLocalStorage){
      const item = localStorage.getItem('feedbacks-data')
      let data = item ? JSON.parse(item) : [];
      data.push(feedback);
      localStorage.setItem('feedbacks-data', JSON.stringify(data));
  }
  else {
    var openDB = indexedDB.open("feedbacks-data", 1);

    openDB.onerror = function(event) {
      alert("Error occurred when loading feedback");
    };

    openDB.onsuccess = function(event) {
      var db = openDB.result;
      var tx = db.transaction(["comit"], "readwrite");
      var store = tx.objectStore("comit");
      var addFeedback = store.put(feedback);
      addFeedback.onsuccess = function(event){
      }
      addFeedback.onerror = function(event){
        alert("Error when loading comit");
      }
      tx.oncomplete = function(){
        db.close();
      }
    };
  }
}

const addElem = (e) => {
  e.preventDefault();

  const isValid = (textarea.value.length > 0 && namearea.value.length > 0);
  
    if (!isValid) {
      var nocomit = document.getElementById("nocomit");
      nocomit.style.display = "block";
      var nocom = document.getElementById("nocom");
      nocom.style.display = "block";
      return;
    }
const date = new Date();
    
var com = new Comit(namearea.value, textarea.value, date.toLocaleDateString(), date.toLocaleTimeString());

if (isOnline()){
   $('#container').prepend(com);
}
if (!isOnline()){
  writeInto({
    name: namearea.value,
    text: textarea.value,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  });
  }
  namearea.value = '';
  textarea.value = '';

  alert("added comit");
}

const onOnline = () => {
  initAndRenderData();
  console.log('Status: Online, set data to server...');
}

const onOffline = () => {
  initAndRenderData();
  console.log('No connect');
}


const addButton = document.getElementById('submitBtn');
addButton.onclick = addElem;
window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);
