import mongoose from 'mongoose';
const schema = mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    image: String,
    link: String,
    published: Date,
    rating: Number,
    reviews: Array,
    bookmarked: Boolean
}, {collection: 'books'});
export default schema;