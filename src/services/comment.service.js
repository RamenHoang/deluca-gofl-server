const commentModel = require('./../models/comment.model');

let getAllComments = async () => {
    let comments = await commentModel.getAllComments();

    return { message: 'SUCCESS', data: comments };
}

let addNewComment = async (currUser, data) => {
    
    let comment = {
        user: currUser._id,
        book: data.product,
        c_content: data.content,
        c_rate: parseInt(data.star)
    }
    
    let newCommentAdd = await commentModel.addNewComment(comment);
    let newComment = await commentModel.getCommentById(newCommentAdd._id);
    return { message: 'SUCCESS', data: newComment };
}

let rateAverageOfBook = async (bookId) => {
    //average rate
    let averageOfBook = await commentModel.rateAverageOfBook(bookId);

    //count comment
    let cntComment = await commentModel.countCommentOfBook(bookId);

    let percentRate = [];
    if (cntComment === 0) {
        let data = {
            rateAverage: 0,
            countComment: cntComment,
            percentRate: [{ star: 1, percent: 0 },
                { star: 2, percent: 0 }, 
                { star: 3, percent: 0 }, 
                { star: 4, percent: 0 },
                { star: 5, percent: 0 }
            ]
        }
        return { message: 'SUCCESS', data: data };
    }
   
    for (let i = 1; i <= 5; i++) {
        let cnt = await commentModel.countCommentOfBookByRate(bookId, i);
        let percent = Math.round(( cnt / cntComment ) * 100);
        percentRate = [...percentRate, { star: i, percent: percent }];
    }

    let data = {
        rateAverage: averageOfBook ? Math.round(averageOfBook[0].average)  : 0,
        countComment: cntComment,
        percentRate: [...percentRate]
    }

    return { message: 'SUCCESS', data: data };
}

module.exports = {
    getAllComments,
    addNewComment,
    rateAverageOfBook
}
