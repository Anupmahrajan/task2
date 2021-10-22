const express = require("express");
const controller = require("../controller/controlCategories");
const router = express.Router();


router.post("/categories", controller.addCategories);

router.get("/categories", controller.readCategories);

router.get("/categories/:id", controller.readCategory);

router.patch("/categories/:id", controller.updateCategory);

router.delete("/categories/:id", controller.deleteCategory);

module.exports = router;
