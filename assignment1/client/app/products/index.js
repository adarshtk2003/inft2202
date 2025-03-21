
import express from "express";

const app = express();
const port = 3000;

function config(app) {
    app.use(express.json());
    app.use(express.static('public'));
}

app.use(express.static('public'));  

config(app); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
