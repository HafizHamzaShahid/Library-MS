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
    const today = new Date();
    // normalize today's date to 00:00:00 for comparison of dates only
    today.setHours(0, 0, 0, 0);
    const updates = [];
    const normalizedLoans = [];

    for (const loan of loans) {
      let status = loan.status || "On time";
      try {
        const loanDue = new Date(loan.dueDate);
        loanDue.setHours(0, 0, 0, 0);
        status = loanDue < today ? "Overdue" : "On time";
      } catch (err) {
        // if dueDate is invalid, fall back to stored status or On time
        status = loan.status || "On time";
      }

      // persist status change so DB stays in sync with computed value
      if (status !== loan.status) {
        updates.push(
          db
            .collection("loans")
            .updateOne({ _id: loan._id }, { $set: { status } })
        );
      }

      normalizedLoans.push({
        id: loan._id.toString(),
        bookId: loan.bookId,
        title: loan.title,
        dueDate: loan.dueDate,
        status,
      });
    }

    if (updates.length) {
      await Promise.all(updates);
    }

    return normalizedLoans;
  }

  static async getById(id) {
    const db = getDb();
    const loan = await db
      .collection("loans")
      .findOne({ _id: new ObjectId(id) });
    if (!loan) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let status = loan.status || "On time";
    try {
      const loanDue = new Date(loan.dueDate);
      loanDue.setHours(0, 0, 0, 0);
      status = loanDue < today ? "Overdue" : "On time";
    } catch (err) {
      status = loan.status || "On time";
    }

    // persist status change if needed
    if (status !== loan.status) {
      await db
        .collection("loans")
        .updateOne({ _id: loan._id }, { $set: { status } });
    }

    return {
      id: loan._id.toString(),
      bookId: loan.bookId,
      title: loan.title,
      dueDate: loan.dueDate,
      status,
    };
  }

  static async deleteById(id) {
    const db = getDb();
    await db.collection("loans").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Loan;

