const { getDb } = require("../assets/database/MongoDB");
const { ObjectId } = require("mongodb");

class Book {
  constructor(title, author, year, status = 'available') {
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
  }

  // Save a new book
  async save() {
    const db = getDb();
    const result = await db.collection("books").insertOne(this);
    return { 
      id: result.insertedId.toString(),
      _id: result.insertedId, 
      ...this 
    };
  }

  // Fetch all books
  static async fetchAll() {
    const db = getDb();
    const books = await db.collection("books").find().toArray();
    // Transform to match frontend format
    return books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      year: book.year,
      status: book.status || 'available'
    }));
  }

  // Get a single book by ID
  static async getBookById(id) {
    const db = getDb();
    const book = await db.collection("books").findOne({ _id: new ObjectId(id) });
    if (book) {
      return {
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        year: book.year,
        status: book.status || 'available'
      };
    }
    return null;
  }
}

module.exports = Book;
