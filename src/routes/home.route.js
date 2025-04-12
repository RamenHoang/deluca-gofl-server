const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home.controller');

router.get('/all-categories', homeController.getAllCategories);
router.get('/sub-categories/:id', homeController.getSubCategories);

router.get('/new-books', homeController.getNewBooks);
router.get('/books-hot', homeController.getBooksHot);
router.get('/books-best-seller', homeController.getBooksBestSeller);

router.get('/banners', homeController.getBanners);
router.get('/categories/:id', homeController.getCateById);
router.get('/get-book-by-cateid/:id', homeController.getBooksByCateId);
router.get('/get-book-by-id/:id', homeController.getBookById);
router.get('/get-book-with-author/:id', homeController.getBooksWithAuthor);
router.get('/get-book-with-price/:id', homeController.getBooksWithPrice);
router.get('/get-books-related/:id', homeController.getBooksRelated);
router.get('/get-all-comments-of-book/:id', homeController.getAllCommentsOfBook);
router.get('/get-discount-products', homeController.getDiscountProducts);


router.get('/search-books', homeController.searchBooks);
router.get('/get-books-by-cate-ids', homeController.getBooksByCateIds);
router.get('/get-payment-info', homeController.getPaymentInfo);

router.get('/min-max-price', homeController.getMinMaxPrice);

module.exports = router;
