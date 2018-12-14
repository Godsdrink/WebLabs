window.onload = function(){ 
  function isOnline() {
    return window.navigator.onLine;
}


const input_form = document.getElementById('addPicture');
const newsForm = document.getElementById('newsForm')
const text = document.getElementById('text');
const picture_Input = document.getElementById('formForFile');

const onSubmitPress = (e) => {
  e.preventDefault();

  const isValid = (text.value.length > 0 );

  if (!isValid) return;
  if (!isOnline()) {
    writeInto({
      body: text.value,
      picture: picture_Input.files[0].name
    });
  } else {
    console.log('isOnline');
  }


  input_form.reset();
  newsForm.reset();

  alert('Вашу новину успішно збережено!');
}

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#example_picture').attr('src', e.target.result);             //result property returns the file's contents. This property is only valid after the read operation is complete                                                                             
      }                                                              //attr() достаёт значение атрибута первого элемента, который ему встретится
    

    reader.readAsDataURL(input.files[0]);
  }
}+

$("#formForFile").change(function() {
  readURL(this);
});

const writeInto = (obj) => {
  const items = localStorage.getItem('news_data')
  let data = items ? JSON.parse(items) : [];
  data.push(obj);
  localStorage.setItem('news_data', JSON.stringify(data));
};



const addButton = document.getElementById('submit-btn');
addButton.onclick = onSubmitPress;
}
