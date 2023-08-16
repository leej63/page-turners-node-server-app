import * as booksDao from './books-dao.js'


// title, author, genre, description, image, link, published, rating, reviews, bookmarked
const createBook = async (req, res) => {
    const newBook = req.body;
    newBook.rating = 0;
    newBook.reviews = [];
    newBook.bookmarked = false;
    const insertedBook = await booksDao.createBook(newBook);
    res.json(insertedBook);
};

const findBooks = async (req, res) => {
    const books = await booksDao.findBooks();
    res.json(books);
};

const updateBook = async (req, res) => {
    const bookIdToUpdate = req.params.bid;
    const updates = req.body;
    const status = await booksDao.updateBook(bookIdToUpdate, updates);
    res.json(status);
};

const deleteBook = async (req, res) => {
    const bookIdToDelete = req.params.bid;
    const status = await booksDao.deleteBook(bookIdToDelete);
    res.json(status);
};

export default (app) => {
    app.post('/api/books', createBook);
    app.get('/api/books', findBooks);
    app.put('/api/books/:bid', updateBook);
    app.delete('/api/books/:tid', deleteBook);
}