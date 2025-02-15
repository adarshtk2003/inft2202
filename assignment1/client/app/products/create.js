// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// File: create.js
// Description: Handles product creation and editing for the product shop.

import ProductService from './product.service.mock.js';
import Product from './product.js';

const params = new URLSearchParams(window.location.search);
const editId = params.get('edit');
let currentProduct = null;

/**
 * Validates the form fields for product creation/update.
 */
function validateForm(name, description, stock, price) {
    let isValid = true;

    // Clear previous error messages
    document.getElementById('productNameError').textContent = '';
    document.getElementById('productDescriptionError').textContent = '';
    document.getElementById('productStockError').textContent = '';
    document.getElementById('productPriceError').textContent = '';

    // Trim input values
    name = name.trim();
    description = description.trim();

    if (!name) {
        document.getElementById('productNameError').textContent = 'Product name is required.';
        isValid = false;
    }

    if (!description) {
        document.getElementById('productDescriptionError').textContent = 'Product description is required.';
        isValid = false;
    }

    if (isNaN(stock) || stock < 0) {
        document.getElementById('productStockError').textContent = 'Stock must be a positive number.';
        isValid = false;
    }

    if (isNaN(price) || price < 0 || !(/^\d+(\.\d{1,2})?$/.test(price.toString()))) {
        document.getElementById('productPriceError').textContent = 'Price must be a positive number with up to 2 decimal places.';
        isValid = false;
    }

    return isValid;
}

/**
 * Auto-fills the form when editing a product.
 */
function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2);
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}

// Handle price input formatting (limit to 2 decimal places)
document.getElementById('productPrice').addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    if (parts.length > 1) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    
    e.target.value = value;
});

// Fetch existing product details if editing
if (editId) {
    const products = ProductService.getProducts() || [];
    currentProduct = products.find(p => p.id === editId);

    if (currentProduct) {
        autoFillForm(currentProduct);
    }
}

// Form submission handler
document.getElementById('create-product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
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
