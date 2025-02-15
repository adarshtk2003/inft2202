// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// file: create.js
// Description: This is my create.js for the product shop.

// client/app/products/create.js
import ProductService from './product.service.mock.js';
import Product from './product.js';

const params = new URLSearchParams(window.location.search);
const editId = params.get('edit');
let currentProduct = null;

function validateForm(name, description, stock, price) {
    let isValid = true;

    document.getElementById('productNameError').textContent = '';
    document.getElementById('productDescriptionError').textContent = '';
    document.getElementById('productStockError').textContent = '';
    document.getElementById('productPriceError').textContent = '';

    if (!name) {
        document.getElementById('productNameError').textContent = 'Product name is required.';
        isValid = false;
    }

    if (!description) {
        document.getElementById('productDescriptionError').textContent = 'Product description is required.';
        isValid = false;
    }

    if (!stock) {
        document.getElementById('productStockError').textContent = 'Stock is required.';
        isValid = false;
    } else if (isNaN(stock)) {
        document.getElementById('productStockError').textContent = 'Stock must be a number.';
        isValid = false;
    } else if (stock < 0) {
        document.getElementById('productStockError').textContent = 'Stock must be a positive number.';
        isValid = false;
    }

    if (!price) {
        document.getElementById('productPriceError').textContent = 'Price is required.';
        isValid = false;
    } else if (isNaN(price)) {
        document.getElementById('productPriceError').textContent = 'Price must be a number.';
        isValid = false;
    } else if (price < 0) {
        document.getElementById('productPriceError').textContent = 'Price must be a positive number.';
        isValid = false;
    } else if (!(/^\d+(\.\d{1,2})?$/).test(price.toString())) {
        document.getElementById('productPriceError').textContent = 'Price must have up to 2 decimal places.';
        isValid = false;
    }

    return isValid;
}

document.getElementById('productPrice').addEventListener('input', function(e) {
    let value = e.target.value;
    
    value = value.replace(/[^\d.]/g, '');
    
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    if (parts.length > 1) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    
    e.target.value = value;
});

function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2); // Ensure price shows 2 decimal places
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}

if (editId) {
    currentProduct = ProductService.getProducts().find(p => p.id === editId);
    if (currentProduct) {
        autoFillForm(currentProduct);
    }
}

document.getElementById('create-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    if (!validateForm(name, description, stock, price)) {
        return;
    }

    const newProduct = new Product(name, description, stock, price);

    if (editId) {
        newProduct.id = editId;
        ProductService.updateProduct(editId, newProduct);
        alert('Product updated successfully!');
    } else {
        ProductService.addProduct(newProduct);
        alert('Product created successfully!');
    }

    window.location.href = 'list.html';
});