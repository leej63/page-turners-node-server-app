import booksModel from './books-model.js';
export const findBooks = ()        => booksModel.find();
export const createBook = ()       => booksModel.create(book); 
export const deleteBook = ()       => booksModel.deleteOne({_id: bid});
export const updateBook = ()       => booksModel.updateOne({_id: bid}, {$set: book});