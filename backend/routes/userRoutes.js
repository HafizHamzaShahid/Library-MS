const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.post("/add-user", async (req, res) => {
    const user = new User(req.body.name, req.body.email, req.body.password);

    try {
        const savedUser = await user.save();
        res.status(201).send(savedUser); // Return the saved user
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get("/get-users", async (req, res) => {
    try {
        const users = await User.fetchAll();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

router.post("/get-user-by-id/:id", async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get("/test", (req, res) => {
    res.send("Hello World! updated");
})

module.exports = router;
