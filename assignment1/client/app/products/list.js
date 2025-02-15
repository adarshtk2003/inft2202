// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// File: list.js
// Description: This file manages the product list, handles pagination, and provides options to update or delete products.

// Import necessary modules
import ProductService from './product.service.mock.js';
import Product from './product.js';

class ProductList {
    constructor() {
        this.products = ProductService.getProducts(); // Fetch all products
        this.currentPage = 1; // Default to the first page
        this.itemsPerPage = 10; // Default items per page
        this.productList = document.querySelector('#product-list tbody'); // Table body element for displaying products
        this.paginationElement = document.getElementById('pagination'); // Pagination container
        this.itemsPerPageSelect = document.getElementById('itemsPerPage'); // Dropdown for selecting items per page

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Event listener for changing the number of items per page
        this.itemsPerPageSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1; // Reset to the first page when changing items per page
            this.render();
        });

        // Initialize items per page from the dropdown value
        this.itemsPerPage = parseInt(this.itemsPerPageSelect.value);
    }

    // Calculate the total number of pages
    getTotalPages() {
        return Math.ceil(this.products.length / this.itemsPerPage);
    }

    // Get the products for the current page
    getCurrentPageProducts() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.products.slice(startIndex, endIndex);
    }

    // Render the product table
    renderProducts() {
        const currentProducts = this.getCurrentPageProducts();

        // Display a message if no products are available
        if (this.products.length === 0) {
            this.productList.innerHTML = '<tr><td colspan="5" class="text-center">No products available.</td></tr>';
            return;
        }

        this.productList.innerHTML = ''; // Clear the table body
        currentProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct('${product.id}')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            `;
            this.productList.appendChild(row);
        });
    }

    // Render pagination controls
    renderPagination() {
        const totalPages = this.getTotalPages();
        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;

        this.paginationElement.innerHTML = paginationHTML; // Update pagination

        // Add event listeners for pagination buttons
        this.paginationElement.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = parseInt(e.target.dataset.page);
                if (newPage >= 1 && newPage <= totalPages) {
                    this.currentPage = newPage;
                    this.render();
                }
            });
        });
    }

    // Render both products and pagination
    render() {
        this.renderProducts();
        this.renderPagination();
    }
}

// Instantiate the ProductList class
const productList = new ProductList();

// Function to navigate to the edit product page
window.editProduct = function(id) {
    window.location.href = `create.html?edit=${id}`;
};

// Function to delete a product and refresh the page
window.deleteProduct = function(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        ProductService.deleteProduct(id);
        window.location.reload();
    }
};
