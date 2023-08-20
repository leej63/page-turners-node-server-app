import mongoose from 'mongoose';
import booksSchema from './books-schema.js';
const booksModel = mongoose.model('BookModel', booksSchema);
export default booksModel;