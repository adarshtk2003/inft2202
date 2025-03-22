// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// File: product.js
// Description: This file defines the Product constructor function for the product shop.


// server/app/products/product.js
function Product(name, description, stock, price, owner = null) {
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.owner = owner;
    this.createdAt = new Date().toISOString();
}

export default Product;