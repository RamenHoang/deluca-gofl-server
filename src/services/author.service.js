const { cloudinary } = require('../utils/cloudinary');
const authorModel = require('./../models/author.model');
const formatBufferToBase64 = require('./../utils/formatBufferToBase64');

/**
 * Get all author
 * @returns json
 */
let getAllAuthors = async () => {
    let allAuthors = await authorModel.getAllAuthors();

    return { message: 'SUCCESS', data: allAuthors };
}

let addNewAuthor = async (data) => {

    let currAuthor = await authorModel.findAuthorByName(data.a_name);

    if (currAuthor) {
        return { message: 'AUTHOR_EXISTS' };
    }

    await authorModel.addNewAuthor(data);

    return { message: 'SUCCESS' };
}

let getAuthorById = async (id) => {
    let currAuthor = await authorModel.getAuthorById(id);
    if (!currAuthor) {
        return { message: 'AUTHOR_NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: currAuthor };
}

let deleteAuthorById = async (id) => {
    let author = await authorModel.getAuthorById(id);
    if (!author) {
        return { message: 'AUTHOR_NOT_FOUND' };
    }

    await authorModel.deleteAuthorById(id);

    return { message: 'SUCCESS' };
}

module.exports = {
    getAllAuthors,
    addNewAuthor,
    getAuthorById,
    deleteAuthorById
}