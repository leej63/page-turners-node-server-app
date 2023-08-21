import booksModel from './books-model.js';

export const findBooks = () => booksModel.find();
export const findBookById = (bid) => booksModel.findOne({_id: bid});
export const findBookByISBN = (isbn) => booksModel.findOne({ isbn: isbn });
export const findBookByTitle = (title) => booksModel.findOne({ title: title });
export const findBooksByAuthor = (author) => booksModel.findAll({ author: author });
export const findBooksByCategory = (category) => booksModel.findAll({ category: category });
export const createBook = (book) => booksModel.create(book); 
export const deleteBook = (bid) => booksModel.deleteOne({_id: bid});
export const updateBook = (bid, book) => booksModel.updateOne({_id: bid}, {$set: book});