window.onload = function(){
    const input_form = document.getElementById('addPicture');
    const newsForm = document.getElementById('newsForm')
    const text = document.getElementById('text');
    const caption = document.getElementById('caption')

    const onSubmitPress = (e) => {
        e.preventDefault();

        const isValid = (text.value.length > 0 && caption.value.length > 0);

        if (!isValid) return;

        input_form.reset();
        newsForm.reset();

        alert("Commit added");
    }

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#example_picture').attr('src', e.target.result);             //result property returns the file's contents. This property is only valid after the read operation is complete
            }                                                              //attr() достаёт значение атрибута первого элемента, который ему встретится


            reader.readAsDataURL(input.files[0]);
        }
    }

        $("#formForFile").change(function() {
            readURL(this);
        });

    const addButton = document.getElementById('submit-btn');
    addButton.onclick = onSubmitPress;
}
// function previewFile() {
//     var preview = document.querySelector('img');
//     var file    = document.querySelector('input[type=file]').files[0];
//     var reader  = new FileReader();

//     reader.onloadend = function () {
//       preview.src = reader.result;
//     }

//     if (file) {
//       reader.readAsDataURL(file);
//     } else {
//       preview.src = "";
//     }
//   }