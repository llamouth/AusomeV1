const express = require('express')
const cors = require('cors')
const app = express()
const usersController = require('./controllers/users.controller')
const resourcesController = require('./controllers/resources.controller')
const cloudinaryController = require('./controllers/uploadController')

app.use(express.json())
app.use(cors())
app.use("/users", usersController)
app.use("/resources", resourcesController)
app.use('/uploads', cloudinaryController)

app.get("/", (req, res) => {
    res.status(200).json("Welcome to the Ausome Database")
})

app.get("*", (req, res) => {
    res.status(500).json({ error: "Invalid URL"})
})

module.exports = app;