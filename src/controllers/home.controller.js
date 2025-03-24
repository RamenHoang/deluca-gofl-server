const paymentModel = require('../models/payment.model');
const homeService = require('./../services/home.service');
const categoryModel = require('./../models/category.model');

let getAllCategories = async (req, res) => {
    try {
        let categories = await homeService.getAllCategories();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getSubCategories = async (req, res) => {
    try {
        let categories = await categoryModel.find({ c_parent: req.params.id })
            .populate('c_parent')
            .sort({
                order: 1,
                createdAt: -1
            })
            .exec();

        return res.status(200).json({ message: 'SUCCESS', data: categories });
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getNewBooks = async (req, res) => {
    try {
        let books = await homeService.getNewBooks(req.query.page);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksHot = async (req, res) => {
    try {
        let books = await homeService.getBooksHot();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksBestSeller = async (req, res) => {
    try {
        let books = await homeService.getBooksBestSeller();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBanners = async (req, res) => {
    try {
        let banners = await homeService.getBanners();

        return res.status(200).json(banners);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getCateById = async (req, res) => {
    try {
        let id = req.params.id;
        let category = await homeService.getCateById(id);

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksByCateId = async (req, res) => {
    try {
        let cateId = req.params.id;
        let minPrice = req.query.minPrice;
        let maxPrice = req.query.maxPrice;
        let books = await homeService.getBooksByCateId(cateId, minPrice, maxPrice);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksByCateIds = async (req, res) => {
    try {
        let cateIds = req.query.cateIds.split(',').map(id => id.trim());
        let minPrice = req.query.minPrice;
        let maxPrice = req.query.maxPrice;
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 6;
        let books = await homeService.getBooksByCateIds(cateIds, minPrice, maxPrice, page, limit);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBookById = async (req, res) => {
    try {
        let id = req.params.id;
        let book = await homeService.getBookById(id);

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksWithAuthor = async (req, res) => {
    try {
        let bookId = req.params.id;
        let books = await homeService.getBooksWithAuthor(bookId);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksWithPrice = async (req, res) => {
    try {
        let bookId = req.params.id;
        let books = await homeService.getBooksWithPrice(bookId);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getBooksRelated = async (req, res) => {
    try {
        let bookId = req.params.id;
        let books = await homeService.getBooksRelated(bookId);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getAllCommentsOfBook = async (req, res) => {
    try {
        let bookId = req.params.id;
        let comments = await homeService.getAllCommentsOfBook(bookId);

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let searchBooks = async (req, res) => {
    try {
        let query = req.query.q;
        let books = await homeService.searchBooks(query);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getDiscountProducts = async (req, res) => {
    try {
        let products = await homeService.getDiscountProducts(req.query.page);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getPaymentInfo = async (req, res) => {
    try {
        let payment = await paymentModel.find({}).populate("qrCode");

        return res.status(200).json(payment ? payment[0] : null);
    } catch (error) {
        return res.status(500).json(error);
    }
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
    searchBooks,
    getDiscountProducts,
    getBooksByCateIds,
    getPaymentInfo,
    getSubCategories,
}
