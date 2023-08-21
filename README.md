# page-turners-node-server-app


# API URL (Deployed to Heroku):
https://page-turner-node-18efed809441.herokuapp.com/api/books

# API Usage:
Find All Book (GET):
 '/api/books'

Find a book by ID (GET):
'/api/books/:bid'

Find a book by its ISBN(GET):
'/api/books/isbn/:isbn'

Create Book (POST):
 '/api/books'

Update a book by ID (PUT):
'/api/books/:bid'

Delete a book by ID (DELETE):
'/api/books/:bid'

# The Book object:
    _id: Number, (_id is the book ID)
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String, (isPublished?)
    authors: [String],
    categories: [String]

# Example testing schema:
Book Creation body schema example (POST):
```
{
    "_id": 33702,
    "title": "Test Title 1",
    "isbn": "10000001",
    "pageCount": 10,
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
    "shortDescription": "Testing content",
    "longDescription": "Long Testing content",
    "status": "PUBLISH",
    "authors": ["Joe Doe", "Jane Doe"],
    "categories": ["Java"]
} 
```
Find a book by its ISBN (GET):
```
http://localhost:4000/api/books/isbn/1935182420
```
Update book by ID (PUT): 
```
URL: http://localhost:4000/api/books/88

Request body:
{ 
"shortDescription": "testing description 1"
 }
```
