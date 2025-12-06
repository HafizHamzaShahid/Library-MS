const getDb = require('../assets/database/MongoDB').getDb;
const mongodb = require("mongodb");

class User {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

   async save() {
        const db = getDb();
        try {
            const result = await db.collection('users').insertOne(this);
            const savedUser = await db.collection('users').findOne({ _id: result.insertedId });
            return savedUser;
        } catch (err) {
            throw new Error('Error inserting user: ' + err.message);
        }
    }

    static async fetchAll() {
        const db = getDb();
        try {
            const result = await db.collection("users").find().toArray();
            return result;
        } catch (error) {
            throw new Error("Error fetching users: " + error.message);
        }

    }

    static async getUserById(id) {
        const db = getDb();
        try{
            const result = await db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
            return result;
        } catch (err) {
            throw new Error("Error fetching users: " + error.message);
        }
    }
    // delete() {}
    // update() {}
}

module.exports = User