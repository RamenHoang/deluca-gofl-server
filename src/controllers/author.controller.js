const authorService = require('./../services/author.service');

let getAllAuthors = async (req, res) => {
    try {
        let allAuthors = await authorService.getAllAuthors();

        return res.status(200).json(allAuthors);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let addNewAuthor = async (req, res) => {
    try {

        let addNewAuthor = await authorService.addNewAuthor(req.body);

        return res.status(200).json(addNewAuthor);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getAuthorById = async (req, res) => {
    try {
        let id = req.params.id;
        let author = await authorService.getAuthorById(id);

        return res.status(200).json(author);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let deleteAuthorById = async (req, res) => {
    try {
        let id = req.params.id;
        let resDelete = await authorService.deleteAuthorById(id);

        return res.status(200).json(resDelete);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    getAllAuthors,
    addNewAuthor,
    getAuthorById,
    deleteAuthorById
}
