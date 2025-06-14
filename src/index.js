//to make sure all the html elements load on the page before function 
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestName = e.target.guestName.value;
        const categoryInput = e.target.querySelector('input[name="guestCategory"]:checked');

        //wanted to alert the user if they do not pick a category for the guest
        if (!categoryInput) {
            alert('Please select a guest category.');
            return;
        }

        const category = categoryInput.id ;

        buildGuestList(guestName, category);
        form.reset()
    })
})

function buildGuestList(guestName, category) {
    let container = document.querySelector("#guestListContainer")

    //creating the table to show the guests info
    let table = document.querySelector('#guestList');
    let tBody;

    //my special/custom feature that allows the table to appaer if there is input or data and to disappear if there's nothing
    if(!table) {
        table = document.createElement('table')
        table.id = 'guestList'

        //creating the table headings 
        let tableHd = document.createElement('thead')
        tableHd.innerHTML = '<tr><th>Name</th><th>Category</th><th>Added at</th><th>RSVP  Response</th><th>Delete</th></tr>'
        table.appendChild(tableHd)
        
        tBody = document.createElement('tbody')  
        table.appendChild(tBody)               

        container.appendChild(table) 
    } else {
        tBody = table.querySelector('tbody');
    }


    //to make sure the number of guests added does not exceed 10
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
    console.log(`The time feature is working ${time.textContent}`)

    //adding the toggle RSVP feature
    let toggleTd = document.createElement('td')

    let toggleBtn = document.createElement('button')
    toggleBtn.setAttribute('dataStatus', 'Not Attending')
    toggleBtn.className = 'toggleButton'

    let toggleTitle = document.createElement('span')
    toggleTitle.className = 'toggleTitle'
    toggleTitle.textContent = 'Not Attending'

    toggleTd.appendChild(toggleBtn);
    toggleTd.appendChild(toggleTitle)

    toggleBtn.addEventListener('click', () => {
        console.log('Toggle is working great so far')
        
        const isAttending = toggleBtn.getAttribute('data-status') === 'Attending';

        if (isAttending) {
          toggleBtn.setAttribute('data-status', 'Not Attending');
          toggleBtn.classList.remove('attending');
          toggleTitle.textContent = 'Not Attending';
        } else {
          toggleBtn.setAttribute('data-status', 'Attending');
          toggleBtn.classList.add('attending');
          toggleTitle.textContent = 'Attending';
        }

        console.log(`The current status is ${toggleTitle.textContent}`)
    })

    //adding the delete button
    let deleteAction = document.createElement('td')
    let btn = document.createElement('button')

    btn.className = 'deleteButton'
    btn.textContent = 'Delete'
    btn.addEventListener('click', handleDelete)
    deleteAction.append(btn)

    //bringing it all together
    tr.append(nameTd, categoryTd, time, toggleTd, deleteAction);
    tBody.append(tr);

}

function handleDelete(e) {
    const row = e.target.closest('tr');
    const tbody = row.parentElement;
    const table = tbody.parentElement;

    row.remove();

    //removes the table if no data or input is available
    //looks at the rows to see that they do not exceed 10
    if (tbody.children.length === 0) {
        table.remove();
    }
}

function handleEdit(e) {
    console.log('Hi Trish, you are trying to edit a guest name')

    //checks for the specific row data we are targeting- the guest name
    const rowData = e.target.closest('tr');
    console.log(rowData);

    const rowElement = rowData.querySelector('.guest-name')
    console.log(rowElement);

    //prevents multiple inputs from appearing in the table at once
    if (rowElement.querySelector('input')) return;

    const currentName = rowElement.textContent.trim();

    const input = document.createElement('input');
    input.value = currentName;
    input.type = 'text';
    console.log(`The current name is ${currentName}`)

    //I added a save button to to allow the user to save their changes to the guest name
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
            console.log(`The updated name is ${updatedName}`)

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

