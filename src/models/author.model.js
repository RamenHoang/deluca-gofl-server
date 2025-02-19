const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    a_name: String,
    a_info: { type: String, default: null },
    createdAt: { type: Date, default: new Date() }
});

AuthorSchema.statics = {
    getAllAuthors() {
        return this.find({})
        .sort({ createdAt: -1 })
        .exec();
    },

    findAuthorByName (name) {
        return this.findOne({ a_name: { $regex: new RegExp(name, 'i') } }).exec();
    },

    getAuthorById(id) {
        return this.findById(id).exec();
    },

    addNewAuthor (data) {
        return this.create(data);
    },

    deleteAuthorById(id) {
        return this.findByIdAndRemove(id).exec();
    }
}

module.exports = mongoose.model("Author", AuthorSchema, "author");
