const express = require('express');
const multer = require('multer');

const authUser = require('./../middlewares/auth.middleware');
const postController = require('./../controllers/post.controller');

const router = express.Router();

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 50 },
});

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authUser.isAdmin, postController.updatePost);
router.post('/', authUser.isAdmin, postController.createPost);
router.post('/upload', authUser.isAdmin, upload.single('file'), postController.upload);
router.delete('/:id', authUser.isAdmin, postController.deletePost);

module.exports = router;
