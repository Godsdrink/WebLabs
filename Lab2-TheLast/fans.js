window.onload = function(){

    const namearea = document.getElementById('name');
    const textarea = document.getElementById('text');


    const feedbackTemplate = (name, text, date, time) => ` 
    <div class="container" style="border-bottom: 2px solid black;text-align: center;font-size:2em;" >
        <p>
        ${text}
        </p>
        <br>
        <span class="review-date" style="float:left">${date}, ${time}</span>
        <span class="review-author" style="float:right">${name}</span>
    </div>
    <div class="divider"></div>
`

    const addElem = (e) => {
        e.preventDefault();

        const isValid = (textarea.value.length > 0 && namearea.value.length > 0);


        if (!isValid) return;

        const date = new Date();

        $('#container').prepend(
            feedbackTemplate(namearea.value, textarea.value, date.toLocaleDateString(), date.toLocaleTimeString())
        );


        namearea.value = '';
        textarea.value = '';
        alert("Commit added");
    }


// Bind listeners to the DOM
    const addButton = document.getElementById('submitBtn');
    addButton.onclick = addElem;
}