const { categories } = require("../controller/controlCategories");


let books = [
    {
        id: 1,
        title: "Juli",
        description: "It's about her life",
        categoryId: 3,
        author: "Anup Maharjan",
        createdDate: new Date()
    },
    {
        id: 2,
        title: "had been",
        description: "It's a horror movie",
        categoryId: 1,
        author: "Anupo Senpai",
        createdDate: new Date()
    }
];

let addBooks = (request, response) => {
   
    const book = books.find((book) => {
        return request.body.id == book.id;
    });

    if (book) {
        return response.status(400).send("Id already in use.");
    }
    
    const category = categories.find(
        (category) => request.body.categoryId == category.id
    );

    if (!category) {
        return response.status(404).send("Category Id not found");
    }

    request.body.createdDate = new Date();
   
    books.push(request.body);
    response.status(201).send(books);
};

let readBooks = (request, response) => {
    response.send(books);
};

let readBook = (request, response) => {
    const book = books.find((book) => request.params.id == book.id);
    if (!book) {
        return response.status(404).send("Books Id not found");
    }
    response.send(book);
};

let readBookByCategory = (request, response) => {
    const bookCategory = books.filter((book) => {
        return request.params.categoryId == book.categoryId;
    });
    response.send(bookCategory);
};

let updateBook = (request, response) => {
    const allowedProperties = ["title", "description", "categoryId", "author"];
    const properties = Object.keys(request.body);
   
    const isValid = properties.every((property) =>
        allowedProperties.includes(property)
    );
    
    if (!isValid || properties.length != 4) {
        return response.status(400).send("Insufficient values");
    }
    const index = books.findIndex((book) => {
        return request.params.id == book.id;
    });
    if (index < 0) {
        return response.status(404).send("Id not found");
    }
    
    const category = categories.find(
        (category) => request.body.categoryId == category.id
    );

    if (!category) {
        return response.status(404).send("Category Id not found");
    }
    
    books[index].title = request.body.title;
    books[index].description = request.body.description;
    books[index].categoryId = request.body.categoryId;
    books[index].author = request.body.author;
    response.send(books[index]);
};

let deletedBook = (request, response) => {
    try {
        const index = books.findIndex((book) => {
            return request.params.id == book.id;
        });
        if (index < 0) {
            return response.status(404).send("Id not found");
        }
        const deletedBook = books.splice(index, 1)[0];
        response.send(deletedBook);
    } catch (error) {
        response.status(500).send();
    }
};

module.exports = {
    addBooks,
    readBooks,
    readBook,
    readBookByCategory,
    updateBook,
    deletedBook
};
