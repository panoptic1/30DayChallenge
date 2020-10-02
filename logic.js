console.log("Let's code this MF");

const entryList = document.querySelector('#entry-list');
const form = document.querySelector('#add-entry-form');

//create element and render entries therein
function renderEntries(doc){
    let li = document.createElement('li');
    let user = document.createElement('span');
    let date = document.createElement('span');
    let dry = document.createElement('span');
    let days = document.createElement('span');
    let entry = document.createElement('span');
    let deleteBtn = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    user.innerHTML = `<p> Entry by <strong>${doc.data().user} </strong> </p>`;
    date.innerHTML = `<p> Date <strong>${doc.data().date} </strong> </p>`;
    dry.innerHTML = `<p>Dry day? <strong>${doc.data().dry}</strong> </p>`;
    days.innerHTML = `<p><strong>${doc.data().days}</strong> consecutive days dry.</p>`;
    entry.innerHTML = `<p>"${doc.data().entry}"</p>`;
    deleteBtn.innerHTML = `<button class="delete">Delete Entry</button>`
    

    li.appendChild(user);
    li.appendChild(date);
    li.appendChild(dry);
    li.appendChild(days);
    li.appendChild(entry);
    li.appendChild(deleteBtn);

    entryList.appendChild(li);
    
    //deleting data
    deleteBtn.addEventListener('click', (e) => {
        //e.stopPropagation();//this may be unnecessary
        //create a variable that targets the document id that we stored in data-id property for each li
        let id = e.target.parentElement.parentElement.getAttribute(`data-id`); //brush up on the 'elem.closest' method and refactor this
        db.collection(`entries`).doc(id).delete();
    })
}

//get a reference to the data inside the database
db.collection(`entries`).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {//I'm a little unsure as to why the syntax here works. I'll have to look up the .then method, but what is 'docs'?
        renderEntries(doc);
    })
});

//saving data
form.addEventListener('submit', (event) => {
    console.log(event);
    event.preventDefault();
    db.collection('entries').add({
        user: form.user.value,
        date: form.date.value,
        dry: form.dry.value,
        days: form.quantity.value,
        entry: form.journal.value
    });
    form.title.value = '';
    form.date.value = '';
    form.dry.value = '';
    form.quantity.value = '';
    form.journal.value = '';
    
});

