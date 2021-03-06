require('dotenv').config()
const express = require("express");
const app = express();


const categoriesRouter = require("./routers/categories");
const booksRouter = require("./routers/books");

app.use(express.json());
app.use(categoriesRouter);
app.use(booksRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is on ${port}.`);
});
