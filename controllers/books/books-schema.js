import mongoose from 'mongoose';
const schema = mongoose.Schema({
    _id: Number,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: [String],
    categories: [String],
    review: String,
    bookmarked: Boolean,
    rating: Number
}, {collection: 'books'});
export default schema;