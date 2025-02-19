const categoryModel = require('./../models/category.model');
const productModel = require('./../models/product.model');
const orderDetailModel = require('./../models/order_detail.model');
const bannerModel = require('./../models/banner.model');
const commentModel = require('./../models/comment.model');
const commentService = require('./comment.service');

let getAllCategories = async () => {
    let categories = await categoryModel.getAllCategory();

    return { message: 'SUCCESS', data: categories };
}

let getNewBooks = async () => {
    let newbooks = await productModel.getNewBooks();

    return { message: 'SUCCESS', data: newbooks };
}

let getBooksHot = async () => {
    let books = await productModel.getBooksHot();

    return { message: 'SUCCESS', data: books };
}

let getBooksBestSeller = async () => {

    //Get bookId best seller
    let books = await orderDetailModel.getBooksBestSeller();
    let ids = [];
    books.map(v => {
        ids = [...ids, v._id];
    });

    //Get detail book
    let data = await productModel.getManyBookInArray(ids);

    return { message: 'SUCCESS', data: data };
}

let getBanners = async () => {
    let banners = await bannerModel.getBanners();

    return { message: 'SUCCESS', data: banners };
}

let getCateById = async (id) => {
    let cate = await categoryModel.getByIdCategory(id);

    if (!cate) {
        return { message:'CATEGORY_NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: cate };
}

let getBooksByCateId = async (cateId) => {
    let books = await productModel.getBooksByCateId(cateId);

    return { message: 'SUCCESS', data: books };
}

let getBookById = async (id) => {
    let book = await productModel.getByIdProduct(id);

    let rate = await commentService.rateAverageOfBook(id);

    if (!book) {
        return { message: 'PRODUCT_NOT_FOUND' };
    }

    let data = {
        ...book._doc,
        evaluate: rate.data
    }

    return { message: 'SUCCESS', data: data };
}

let getBooksWithAuthor = async (bookId) => {
    let book = await productModel.getByIdProduct(bookId);

    // let bookWithAuthor = await productModel.getBooksWithAuthor()

    return { message: 'SUCCESS', data: book.author };
}

let getBooksWithPrice = async (bookId) => {
    let book = await productModel.getByIdProduct(bookId);

    let data = {
        p_price: book.p_price,
        category: book.category._id
    }
    let books = await productModel.getBooksWithPrice(data);

    let newBooks = books.filter(v => v._id !== book._id);

    return { message: 'SUCCESS', data: newBooks };
}

let getBooksRelated = async (bookId) => {
    let book = await productModel.getByIdProduct(bookId);
    let authors = [];

    book.author.map(v => {
        authors = [...authors, v._id];
    });

    // let data = {
    //     p_price: book.p_price,
    //     category: book.category._id
    // }

    let books = await productModel.getBooksRelated(book.p_price, authors, book.category._id, book._id);

    return { message: 'SUCCESS', data: books };
}

let getAllCommentsOfBook = async (bookId) => {
    let comments = await commentModel.getAllCommentsOfBook(bookId);

    return { message: 'SUCCESS', data: comments };
}

let searchBooks = async (query) => {
    let books = await productModel.searchBooks(query);

    if (!books) {
        return { message:  'NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: books };
}

module.exports = {
    getAllCategories,
    getNewBooks,
    getBooksHot,
    getBooksBestSeller,
    getBanners,
    getCateById,
    getBooksByCateId,
    getBookById,
    getBooksWithAuthor,
    getBooksWithPrice,
    getBooksRelated,
    getAllCommentsOfBook,

    searchBooks
}
