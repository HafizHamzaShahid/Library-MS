const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

// Add a book (suggest a book)
router.post("/add-book", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    
    // Validate required fields
    if (!title || !author || !year) {
      return res.status(400).send({ 
        message: "Title, author, and year are required" 
      });
    }

    const book = new Book(
      title.trim(),
      author.trim(),
      parseInt(year),
      'available' // New books are always available
    );

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all books
router.get("/get-books", async (req, res) => {
  try {
    const books = await Book.fetchAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a book by ID
router.get("/get-book/:id", async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
