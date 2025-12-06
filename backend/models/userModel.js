const { getDb } = require("../assets/database/MongoDB");
const { ObjectId } = require("mongodb");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Save a new user
  async save() {
    const db = getDb();
    const result = await db.collection("users").insertOne(this);
    return { _id: result.insertedId, ...this };
  }

  // Fetch all users
  static async fetchAll() {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    return users;
  }

  // Get a single user by ID
  static async getUserById(id) {
    const db = getDb();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    return user;
  }
}

module.exports = User;
