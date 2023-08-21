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

const findBookById = async (req, res) => {
    const bookId = req.params.bid;
    const book = await booksDao.findBookById(bookId);
        if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const findBookByISBN = async (req, res) => {
  const isbnToSearch = req.params.isbn;
  try {
    const book = await booksDao.findBookByISBN(isbnToSearch);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'No book found with the given ISBN' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching book by ISBN' });
  }
};

const findBookByTitle = async (req, res) => {
    const titleToSearch = req.params.title;
    try {
        const book = await booksDao.findBookByTitle(titleToSearch);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'No book found with the given title' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching book by title' });
    }
};

const findBooksByAuthor = async (req, res) => {
    const authorToSearch = req.params.author;
    try {
        const books = await booksDao.findBooksByAuthor(authorToSearch);
        if (books) {
            res.json(books);
        } else {
            res.status(404).json({ message: 'No books found with the given author' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching books by author' });
    }
};

const findBooksByCategory = async (req, res) => {
    const categoryToSearch = req.params.category;
    try {
        const books = await booksDao.findBooksByCategory(categoryToSearch);
        if (books) {
            res.json(books);
        } else {
            res.status(404).json({ message: 'No books found with the given category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching books by category' });
    }
};

const updateBook = async (req, res) => {
    const bookIdToUpdate = req.params.bid;
    const currentContent = await booksDao.findBookById(bookIdToUpdate);
    if (!currentContent) {
        res.json({ success: false, message: `Book with ID ${bookIdToUpdate} does not existed` });
        return;
    }
    const updates = req.body;
    try {
            const updateResult = await booksDao.updateBook(bookIdToUpdate, updates);
            if (updateResult.acknowledged && updateResult.modifiedCount == 1) {
            res.json({ success: true, message: `Book with ID ${bookIdToUpdate} has been successfully updated` });
            } else if (updateResult.modifiedCount == 0) {
            res.json({ success: false, message: `No changes were applied to the book with ID ${bookIdToUpdate}` });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'An error occurred while updating the book' });
        }
};


const deleteBook = async (req, res) => {
    const bookIdToDelete = req.params.bid;
    try {
        const status = await booksDao.deleteBook(bookIdToDelete);
        if (status.acknowledged && status.deletedCount == 1) {
            res.json({ success: true, message: `Book with ID ${bookIdToDelete} has been successfully deleted` });
        } else if (status.deletedCount == 0) {
            res.json({ success: false, message: `The book with ID ${bookIdToDelete} does not exist` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while deleting the book' });
    }
};

export default (app) => {
    app.post('/api/books', createBook);
    app.get('/api/books', findBooks);
    app.get('/api/books/:bid', findBookById);
    app.get('/api/books/isbn/:isbn', findBookByISBN);
    app.get('/api/books/title/:title', findBookByTitle);
    app.get('/api/books/author/:author', findBooksByAuthor);
    app.get('/api/books/category/:category', findBooksByCategory);
    app.put('/api/books/:bid', updateBook);
    app.delete('/api/books/:bid', deleteBook);
}