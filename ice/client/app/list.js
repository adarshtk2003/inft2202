
console.log('we are on the list page');
const entriesPerPage = 3; // Change this value to set entries per page
let currentPage = 1;
/* do table stuff */
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');

const records = animalService.getAnimals();

if (!records.length) {
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
} else {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawAnimalTable(records);
}
/* 
 * 
 */


function drawAnimalTable(animals) {
    const totalPages = Math.ceil(animals.length / entriesPerPage);
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const paginatedAnimals = animals.slice(start, end);

    const tbody = eleTable.querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous entries

    for (let animal of paginatedAnimals) {
        const row = tbody.insertRow();
        row.insertCell().textContent = animal.name;
        row.insertCell().textContent = animal.breed;
        row.insertCell().textContent = animal.legs;
        row.insertCell().textContent = animal.eyes;
        row.insertCell().textContent = animal.sound;

        const eleBtnCell = row.insertCell();
        
        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', onDeleteButtonClick(animal));
        eleBtnCell.append(eleBtnDelete);

        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
        eleBtnEdit.href = `./add.html?name=${animal.name}`;
        eleBtnCell.append(eleBtnEdit);
    }

    drawPagination(totalPages);
}

function drawPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        currentPage--;
        drawAnimalTable(records);
    });
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        pageBtn.disabled = i === currentPage;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            drawAnimalTable(records);
        });
        paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        drawAnimalTable(records);
    });
    paginationContainer.appendChild(nextBtn);
}

function onDeleteButtonClick(animal) {
    return event => {
        animalService.deleteAnimal(animal);
        window.location.reload();
    }
}

function onEditButtonClick(animal) {
    return event => {
        animalService.updateAnimal(animal);
    }
}
