// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// file: index.js
// Description: This is my index.js for the product shop.

import productService from "../app/product.service.mock";

const params = new URL(document.location).searchParams;
let recCount = params.get("records");
if (recCount !== null) {
    let products = [];
    for (let index = 0; index < recCount; index++) {
        products.push({
            "name": `Cool Product ${index}`,
            "description": "A product for demonstration.",
            "stock": 35,
            "price": 39.95
        });
    }
    productService.saveProduct(products);
}

const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('product-list');
const eleWaiting = document.getElementById('waiting');
const errorMessage = document.querySelector('#error-message');

let recordPage = {
    page: Number(params.get('page') ?? 1),
    perPage: Number(params.get('perPage') ?? 7)
};

try {
    const { records, pagination } = await productService.getProductPage(recordPage);
    eleWaiting.classList.add('d-none');
    if (!records.length) {
        eleEmpty.classList.remove('d-none');
        eleTable.classList.add('d-none');
    } else {
        eleEmpty.classList.add('d-none');
        eleTable.classList.remove('d-none');
        drawProductTable(records);
        drawPagination(pagination);
    }
} catch (ex) {
    eleWaiting.classList.add('d-none');
    errorMessage.innerHTML = ex;
    errorMessage.classList.remove('d-none');
}

function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
    const pagination = document.getElementById('pagination');
    if (pages > 1) {
        pagination.classList.remove('d-none');
    }
    const ul = document.createElement("ul");
    ul.classList.add('pagination');
    
    ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', (page == 1) ? 'disabled' : ''));
    
    for (let i = 1; i <= pages; i++) {
        ul.insertAdjacentHTML('beforeend', addPage(i, i, (i == page) ? 'active' : ''));
    }
    
    ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', (page == pages) ? 'disabled' : ''));

    pagination.append(ul);

    
    function addPage(number, text, style) {
        return `<li class="page-item ${style}">
            <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
        </li>`;
    }
}


function drawProductTable(products) {
    for (let product of products) {
        const row = eleTable.insertRow();
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = product.description;
        row.insertCell().textContent = product.stock;
        row.insertCell().textContent = product.price.toFixed(2);

        const eleBtnCell = row.insertCell();
        
        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', onDeleteButtonClick(product));
        eleBtnCell.append(eleBtnDelete);

        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-edit"></i>`;
        eleBtnEdit.href = `./product.html?name=${product.name}`;
        eleBtnCell.append(eleBtnEdit);
    }
}

function onDeleteButtonClick(product) {
    return event => {
        productService.deleteProduct(product.name)
            .then(() => {
                window.location.reload();
            });
    }
}

