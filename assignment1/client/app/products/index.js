// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// file: index.js
// Description: This is my index.js for the product shop.

import productService from "../app/product.service.mock";

// Get query parameters from the URL
const params = new URL(document.location).searchParams;
let recCount = params.get("records");
if (recCount !== null) {
    let products = [];
    // Generate mock products based on the 'records' query parameter
    for (let index = 0; index < recCount; index++) {
        products.push({
            "name": `Cool Product ${index}`,
            "description": "A product for demonstration.",
            "stock": 35,
            "price": 39.95
        });
    }
    // Save generated products into the productService
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

// Fetch the product page with the current page and perPage query parameters
try {
    const { records, pagination } = await productService.getProductPage(recordPage);
    eleWaiting.classList.add('d-none');
    if (!records.length) {
        // If no records are found, display the empty message
        eleEmpty.classList.remove('d-none');
        eleTable.classList.add('d-none');
    } else {
        // If records are found, display them in a table
        eleEmpty.classList.add('d-none');
        eleTable.classList.remove('d-none');
        drawProductTable(records);
        drawPagination(pagination);
    }
} catch (ex) {
    // Handle any errors that occur during the fetch operation
    eleWaiting.classList.add('d-none');
    errorMessage.innerHTML = ex;
    errorMessage.classList.remove('d-none');
}

// Function to draw pagination links
function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
    const pagination = document.getElementById('pagination');
    if (pages > 1) {
        pagination.classList.remove('d-none');
    }
    const ul = document.createElement("ul");
    ul.classList.add('pagination');
    // Add "Previous" page link
    ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', (page == 1) ? 'disabled' : ''));
    // Add page links
    for (let i = 1; i <= pages; i++) {
        ul.insertAdjacentHTML('beforeend', addPage(i, i, (i == page) ? 'active' : ''));
    }
    // Add "Next" page link
    ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', (page == pages) ? 'disabled' : ''));

    pagination.append(ul);

    // Helper function to create a pagination link
    function addPage(number, text, style) {
        return `<li class="page-item ${style}">
            <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
        </li>`;
    }
}

// Function to render products in a table format
function drawProductTable(products) {
    for (let product of products) {
        const row = eleTable.insertRow();
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = product.description;
        row.insertCell().textContent = product.stock;
        row.insertCell().textContent = product.price.toFixed(2);

        const eleBtnCell = row.insertCell();
        
        // Delete button
        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', onDeleteButtonClick(product));
        eleBtnCell.append(eleBtnDelete);

        // Edit button
        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-edit"></i>`;
        eleBtnEdit.href = `./product.html?name=${product.name}`;
        eleBtnCell.append(eleBtnEdit);
    }
}

// Function that handles the delete button click event
function onDeleteButtonClick(product) {
    return event => {
        productService.deleteProduct(product.name)
            .then(() => {
                // After deletion, reload the page to refresh the product list
                window.location.reload();
            });
    }
}

