const express = require("express");

const controller = require("../controller/controlBooks");
const router = express.Router();


router.post("/books", controller.addBooks);


router.get("/books", controller.readBooks);


router.get("/books/:id", controller.readBook);


router.get("/book/:categoryId", controller.readBookByCategory);


router.patch("/books/:id", controller.updateBook);


router.delete("/books/:id", controller.deletedBook);


module.exports = router;
