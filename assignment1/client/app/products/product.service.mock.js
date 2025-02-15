// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// File: product.service.mock.js
// Description: This file contains a mock product service that manages product data using localStorage.

// Import the Product class
import Product from './product.js';

class ProductService {
    constructor() {
        this.products = this.loadProducts(); // Load existing products from localStorage on initialization
    }

    // Load products from localStorage
    loadProducts() {
        const products = localStorage.getItem('products'); // Retrieve stored products
        const parsedProducts = products ? JSON.parse(products) : []; // Parse JSON or return empty array if no data
        
        // Convert parsed objects into Product instances
        return parsedProducts.map(p => {
            const product = new Product(p.name, p.description, p.stock, p.price);
            product.id = p.id; // Retain original product ID
            return product;
        });
    }

    // Save current products to localStorage
    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products)); // Convert products array to JSON and store
    }

    // Add a new product to the list
    addProduct(product) {
        this.products.push(product); // Add new product to array
        this.saveProducts(); // Save updated product list to localStorage
    }

    // Retrieve all products
    getProducts() {
        return this.products; // Return the product list
    }

    // Delete a product by ID
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id); // Remove product with matching ID
        this.saveProducts(); // Save updated product list to localStorage
    }

    // Update an existing product by ID
    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product => 
            product.id === id ? updatedProduct : product // Replace matching product with updated data
        );
        this.saveProducts(); // Save updated product list to localStorage
    }
}

// Export a single instance of ProductService
export default new ProductService();
