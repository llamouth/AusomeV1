const express = require("express")
const users = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const { authenticateToken } = require("../auth/auth")
const { createUser, getAllUsers, getSingleUser, loginUser, deleteUser, updateUser } = require("../queries/users.queries")
const postsController = require('./posts.controller')
const friendsController = require('./friends.controller')

users.use('/:user_id/posts', authenticateToken, postsController)
users.use('/:user_id/friends', authenticateToken, friendsController)

users.get("/", async (req, res) => {
    const allUsers = await getAllUsers()
    if(allUsers[0]){
        res.status(200).json(allUsers)
    }else {
        res.status(500).json({ error: "Internal Server error" })
    }
})

users.get("/:id", async (req, res) => {
    const { id } = req.params
    const singleUser = await getSingleUser(id)
    if(singleUser.id){
        res.status(200).json(singleUser)
    }else {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

users.post("/", async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, secret, { expiresIn: "1d" })
        const user = { 
            user_id: newUser.id,
            username: newUser.username, 
            email: newUser.email,  
        }

        res.status(201).json({ user, token })
    } catch (error) {
        res.status(500).json({ error: "Invalid information", info: error })
    }
})

users.post("/login", async (req, res) => {
    try {
        const userLoggedIn = await loginUser(req.body);
        if(!userLoggedIn){
            res.status(401).json({ error: "Invalid username or password" })
            return 
        }

        const token = jwt.sign({ userId: userLoggedIn.user_id, username: userLoggedIn.username }, secret, { expiresIn: "1d" });

        const user = userLoggedIn

        res.status(200).json({ 
            user , 
            token 
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
})

users.put("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params
    const updatedUser = await updateUser(id, req.body)
    if(updatedUser.id) {
        res.status(200).json(updatedUser)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

users.delete("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params
    const deletedUser = await deleteUser(id)
    if(deletedUser.id){
        res.status(200).json({ success: `Successfully deleted ${deletedUser.username}`})
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

module.exports = users;