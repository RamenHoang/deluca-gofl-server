const commentService = require('./../services/comment.service');

let getAllComments = async (req, res) => {
    try {
        let comments = await commentService.getAllComments();

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let addNewComment = async (req, res) => {
    try {
        let currUser = req.user;
        let data = req.body;

        let comment = await commentService.addNewComment(currUser, data);

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let rateAverageOfBook = async (req, res) => {
    try {
        let bookId = req.params.id;

        let rateAvarage = await commentService.rateAverageOfBook(bookId);

        return res.status(200).json(rateAvarage);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllComments,
    addNewComment,
    rateAverageOfBook
}
