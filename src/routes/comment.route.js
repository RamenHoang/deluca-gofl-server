const express = require('express');
const commentController = require('./../controllers/comment.controller');
const authUser = require('./../middlewares/auth.middleware');

const router = express.Router();

router.get('/', commentController.getAllComments);
router.post('/', authUser.isLogin, commentController.addNewComment);
router.get('/average/:id', commentController.rateAverageOfBook);

module.exports = router;
