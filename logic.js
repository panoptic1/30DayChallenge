console.log("Let's code this MF");

const entryList = document.querySelector('#entry-list');
const form = document.querySelector('#add-entry-form');

//create element and render entries therein
function renderEntries(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let dry = document.createElement('span');
    let date = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    date.innerHTML = `<p> Enry date: <strong>${doc.data().date}</strong> </p>`;
    title.innerHTML = `<p> How did you feel? <strong>${doc.data().title} </strong> </p>`;
    dry.innerHTML = `<p>Did you stay dry? <strong>${doc.data().dry}</strong> </p>
                    <br>`;
    
    li.appendChild(date);
    li.appendChild(title);
    li.appendChild(dry);

    entryList.appendChild(li);
}

//get a reference to the data inside the database
db.collection(`entries`).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderEntries(doc);
    })
});

//saving data
form.addEventListener('submit', (event) => {
    console.log(event);
    event.preventDefault();
    db.collection('entries').add({
        title: form.title.value,
        dry: form.dry.value,
        date: form.date.value
    });
    form.title.value = '';
    form.dry.value = '';
    form.date.value = '';
});

