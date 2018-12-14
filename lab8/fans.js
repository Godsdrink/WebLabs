window.onload= function(){
  function isOnline() {
    return window.navigator.onLine;
}
const namearea = document.getElementById('name');
const textarea = document.getElementById('text');


const feedbackTemplate = (name, text, date, time) => ` 
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

const initAndRenderData = () => {
  if (!isOnline()) return;
  const data = localStorage.getItem('feedbacks-data');

  if (!data) {
    console.log('No local data');
  } else 
    JSON.parse(data).forEach(({ name, text, date, time }) => {
        $('#container').prepend(
        feedbackTemplate(name, text, date, time),
        );
    });
  
}


 const writeInto = (obj) => {
  const item = localStorage.getItem('feedbacks-data')
  let data = item ? JSON.parse(item) : [];
  data.push(obj);
  localStorage.setItem('feedbacks-data', JSON.stringify(data));
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
    
  

if (isOnline()){
   $('#container').prepend( //add content inside element
    feedbackTemplate(namearea.value, textarea.value, date.toLocaleDateString(), date.toLocaleTimeString())
    
  );
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
}