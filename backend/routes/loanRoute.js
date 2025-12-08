const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const Loan = require("../models/loanModel");
const { getDb } = require("../assets/database/MongoDB");
const { ObjectId } = require("mongodb");

// Borrow a book
router.post("/borrow", async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    // Ensure book exists and is available
    const book = await Book.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status !== "available") {
      return res.status(400).json({ message: "Book is not available" });
    }

    // Update book status to checked_out
    const db = getDb();
    await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { status: "checked_out" } }
    );

    // Create loan with 14-day due date
    const due = new Date();
    due.setDate(due.getDate() + 14);
    const loan = new Loan(bookId, book.title, due.toISOString().slice(0, 10), "On time");
    const savedLoan = await loan.save();

    const updatedBook = { ...book, status: "checked_out" };

    res.status(201).json({ book: updatedBook, loan: savedLoan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Return a book
router.post("/return/:loanId", async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.getById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Set book back to available
    const db = getDb();
    await db.collection("books").updateOne(
      { _id: new ObjectId(loan.bookId) },
      { $set: { status: "available" } }
    );

    // Remove loan
    await Loan.deleteById(loanId);

    res.status(200).json({ message: "Book returned", bookId: loan.bookId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List all borrowed books (loans)
router.get("/", async (_req, res) => {
  try {
    const loans = await Loan.fetchAll();
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

