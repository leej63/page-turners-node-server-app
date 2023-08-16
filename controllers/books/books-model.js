import mongoose from 'mongoose';
import booksSchema from './booksSchema.js';
const booksModel = mongoose.model('BookModel', booksSchema);
export default booksModel;