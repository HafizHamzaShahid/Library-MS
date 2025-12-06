const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

// Add a book
router.post("/add-book", async (req, res) => {
  const book = new Book(
    req.body.title,
    req.body.writer,
    req.body.publishedYear,
    req.body.isAvailable
  );

  try {
    const savedBook = await book.save();
    res.status(201).send(savedBook);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Get all books
router.get("/get-books", async (req, res) => {
  try {
    const books = await Book.fetchAll();
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Get a book by ID
router.get("/get-book/:id", async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
