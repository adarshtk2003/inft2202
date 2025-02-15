// Name: Adarsh Thekkekulathingal Kuriyachan
// Student ID: 100925209
// Course: Web Development - CSS
// file: product.js
// Description: This is my product.js for the product shop.

function Product(name, description, stock, price) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
}

export default Product;