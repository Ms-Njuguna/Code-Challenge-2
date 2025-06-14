
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestName = e.target.guestName.value;
        const categoryInput = e.target.querySelector('input[name="guestCategory"]:checked');
        const category = categoryInput ? categoryInput.id : "unspecified";


        buildGuestList(guestName, category);
        form.reset()
    })
})

function buildGuestList(guestName, category) {
    let container = document.querySelector("#guestListContainer")

    //creating the table 
    let table = document.querySelector('#guestList');
    let tBody;

    if(!table) {
        table = document.createElement('table')
        table.id = 'guestList'

        let tableHd = document.createElement('thead')
        tableHd.innerHTML = '<tr><th>Name</th><th>Category</th><th>Added at</th><th>Delete</th></tr>'
        table.appendChild(tableHd)

        tBody = document.createElement('tbody')  
        table.appendChild(tBody)               

        container.appendChild(table) 
    } else {
        tBody = table.querySelector('tbody');
    }

    if (table.querySelectorAll('tbody tr').length >= 10) {
        alert("You can only add up to 10 guests!");
        return;
    }

    let tr = document.createElement('tr')

    //adding the name to the table 
    let nameTd = document.createElement('td')
    nameTd.className = 'guest-name';
    
    //added an edit button which is a pencil
    let editBtn = document.createElement('button')
    editBtn.className = 'editBtn';
    editBtn.innerHTML = '<img src= "./images/pencil-square.svg" alt="edit icon" width= "15" height = "15">'
    editBtn.addEventListener('click', handleEdit)

    nameTd.append(editBtn,  guestName);

    //adding the category to the table
    let categoryTd = document.createElement('td')

    //adding a circle tag before the category name with specified colors for each category
    let circle = document.createElement('span')
    let categoryClass = category.toLowerCase();
    circle.className = `category-dot ${categoryClass}`;

    categoryTd.append(circle, category);


    //adding the time each guest was added
    let time = document.createElement('td')
    time.textContent = new Date().toLocaleTimeString()

    //adding the delete button
    let deleteAction = document.createElement('td')
    let btn = document.createElement('button')

    btn.className = 'deleteButton'
    btn.textContent = 'Delete'
    btn.addEventListener('click', handleDelete)
    deleteAction.append(btn)

    tr.append(nameTd, categoryTd, time, deleteAction);
    tBody.append(tr);

}

function handleDelete(e) {
    const row = e.target.closest('tr');
    const tbody = row.parentElement;
    const table = tbody.parentElement;

    row.remove();

    if (tbody.children.length === 0) {
        table.remove();
    }
}

function handleEdit(e) {
    console.log('Hi Trish, you are trying to edit a guest name')
    //const editName = document.getElementsByClassName('guest-name');
    const rowData = e.target.closest('tr');
    console.log(rowData);

    const rowElement = rowData.querySelector('.guest-name')
    console.log(rowElement);

    if (rowElement.querySelector('input')) return;

    const currentName = rowElement.textContent.trim();
    //console.log(guestName)

    const input = document.createElement('input');
    input.value = currentName;
    input.type = 'text';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save'
    saveBtn.className = 'saveBtn'

    rowElement.textContent= '';
    rowElement.append(input);
    rowElement.append(saveBtn);

    saveBtn.addEventListener('click', () => {
        const updatedName = input.value.trim();
        if (updatedName) {

            rowElement.textContent = '';
            const nameSpan = document.createElement('span');
            nameSpan.textContent = updatedName;

            let editBtn = document.createElement('button')
            editBtn.className = 'editBtn';
            editBtn.innerHTML = '<img src= "./images/pencil-square.svg" alt="edit icon" width= "15" height = "15">'
            editBtn.addEventListener('click', handleEdit)

            rowElement.appendChild(editBtn);     
            rowElement.appendChild(nameSpan);
        } else {
            alert("Name cannot be empty!");
        }
    });
}

