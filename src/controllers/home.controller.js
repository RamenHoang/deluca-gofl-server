const homeService = require('./../services/home.service');

let getAllCategories = async (req, res) => {
    try {
        let categories = await homeService.getAllCategories();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getNewBooks = async (req, res) => {
    try {
        let books = await homeService.getNewBooks();

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
        let books = await homeService.getBooksByCateIds(cateIds, minPrice, maxPrice);

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

let getBooksRelated = async (req,res) => {
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
        let products = await homeService.getDiscountProducts();

        return res.status(200).json(products);
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
}
