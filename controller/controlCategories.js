let categories = [
    { id: 1, title: "Comedy", createdDate: new Date() },
    { id: 2, title: "Sad", createdDate: new Date() },
    { id: 3, title: "Science", createdDate: new Date() },
    { id: 4, title: "Logical", createdDate: new Date() }
];

let addCategories = (request, response) => {
    
    const properties = Object.keys(request.body);
    
    if (properties.length < 1) {
        return response.status(400).send("Empty body error");
    }
    
    const category = categories.find(
        (category) => request.body.id == category.id
    );

    if (category) {
        return response.status(400).send("Used ID");
    }
   
    request.body.createdDate = new Date();
    
    categories.push(request.body);
    response.status(201).send(categories);
};

let readCategories = (request, response) => {
    response.send(categories);
};

let readCategory = (request, response) => {
    
    const category = categories.find(
        (category) => request.params.id == category.id
    );
    if (!category) {
        response.status(404).send("Category not found");
    }

    response.send(category);
};

let updateCategory = (request, response) => {
    const allowedProperties = ["title"];
    const properties = Object.keys(request.body);
   
    const isValid = properties.every((property) =>
        allowedProperties.includes(property)
    );
   
    if (!isValid || properties.length <= 0) {
        return response.status(400).send("Invalid Input.");
    }

    const index = categories.findIndex(
        (category) => request.params.id == category.id
    );
    if (index < 0) {
        return response.status(404).send({ error: "ID not found!" });
    }

    categories[index].title = request.body.title;
    response.send(categories[index]);
};

let deleteCategory = (request, response) => {
    try {
        const index = categories.findIndex(
            (category) => request.params.id == category.id
        );
        if (index < 0) {
            response.status(404).send("Category not found");
        }

        const deleteCategory = categories.splice(index, 1)[0];
        response.send(deleteCategory);
    } catch (error) {
        response.status(500).send();
    }
};

module.exports = {
    addCategories,
    readCategories,
    readCategory,
    updateCategory,
    deleteCategory,
    categories
};
