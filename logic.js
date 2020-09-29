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
    title.textContent = doc.data().title;
    dry.textContent = doc.data().dry;
    date.textContent = doc.data().date;

    li.appendChild(title);
    li.appendChild(dry);
    li.appendChild(date);

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

