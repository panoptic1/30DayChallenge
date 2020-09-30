console.log("Let's code this MF");

const entryList = document.querySelector('#entry-list');
const form = document.querySelector('#add-entry-form');

//create element and render entries therein
function renderEntries(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let dry = document.createElement('span');
    let date = document.createElement('span');
    let deleteBtn = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    date.innerHTML = `<p> Enry date: <strong>${doc.data().date}</strong> </p>`;
    title.innerHTML = `<p> How did you feel? <strong>${doc.data().title} </strong> </p>`;
    dry.innerHTML = `<p>Did you stay dry? <strong>${doc.data().dry}</strong> </p>`;
    deleteBtn.innerHTML = `<button class="delete">Delete Entry</button>`
    

    li.appendChild(date);
    li.appendChild(title);
    li.appendChild(dry);
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
        title: form.title.value,
        dry: form.dry.value,
        date: form.date.value
    });
    form.title.value = '';
    form.dry.value = '';
    form.date.value = '';
});

