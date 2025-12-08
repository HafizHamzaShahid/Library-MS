const { getDb } = require("../assets/database/MongoDB");
const { ObjectId } = require("mongodb");

class Loan {
  constructor(bookId, title, dueDate, status = "On time") {
    this.bookId = bookId;
    this.title = title;
    this.dueDate = dueDate;
    this.status = status;
  }

  async save() {
    const db = getDb();
    const result = await db.collection("loans").insertOne(this);
    return {
      id: result.insertedId.toString(),
      _id: result.insertedId,
      ...this,
    };
  }

  static async fetchAll() {
    const db = getDb();
    const loans = await db.collection("loans").find().toArray();
    return loans.map((loan) => ({
      id: loan._id.toString(),
      bookId: loan.bookId,
      title: loan.title,
      dueDate: loan.dueDate,
      status: loan.status || "On time",
    }));
  }

  static async getById(id) {
    const db = getDb();
    const loan = await db
      .collection("loans")
      .findOne({ _id: new ObjectId(id) });
    if (!loan) return null;
    return {
      id: loan._id.toString(),
      bookId: loan.bookId,
      title: loan.title,
      dueDate: loan.dueDate,
      status: loan.status || "On time",
    };
  }

  static async deleteById(id) {
    const db = getDb();
    await db.collection("loans").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Loan;

