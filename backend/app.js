const express = require('express')
const app = express()
const cors = require('cors')
const usersController = require('./controllers/users.controller')

app.use(express.json())
app.use(cors())
app.use("/users", usersController)

app.get("/", (req, res) => {
    res.status(200).json("Welcome to the Ausome Database")
})

app.get("*", (req, res) => {
    res.status(500).json({ error: "Invalid URL"})
})

module.exports = app;