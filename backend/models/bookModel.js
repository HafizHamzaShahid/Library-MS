const { getDb } = require("../assets/database/MongoDB");
const { ObjectId } = require("mongodb");

class Book {
  constructor(title, writer, publishedYear, isAvailable) {
    this.title = title;
    this.writer = writer;
    this.publishedYear = publishedYear;
    this.isAvailable = isAvailable;
  }

  // Save a new book
  async save() {
    const db = getDb();
    const result = await db.collection("books").insertOne(this);
    return { _id: result.insertedId, ...this };
  }

  // Fetch all books
  static async fetchAll() {
    const db = getDb();
    const books = await db.collection("books").find().toArray();
    return books;
  }

  // Get a single book by ID
  static async getBookById(id) {
    const db = getDb();
    const book = await db.collection("books").findOne({ _id: new ObjectId(id) });
    return book;
  }
}

module.exports = Book;
