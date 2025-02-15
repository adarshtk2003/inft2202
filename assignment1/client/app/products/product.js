// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// File: product.js
// Description: This file defines the Product constructor function for the product shop.

function Product(name, description, stock, price) {
    // Generate a unique ID for each product using a random string
    this.id = Math.random().toString(36).substr(2, 9);
    
    // Assign provided values to product properties
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
}

// Export the Product constructor for use in other modules
export default Product;
