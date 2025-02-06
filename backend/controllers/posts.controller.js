const express = require('express')
const posts = express.Router({ mergeParams: true})
const { getAllPosts, getSinglePost, createNewPost, updatePost, deletePost } = require("../queries/posts.queries")
const commentsController = require('./comments.controller')
const likesController = require('./likes.controller')

posts.use('/:post_id/comments', commentsController)
posts.use('/:post_id/likes', likesController)

posts.get('/', async (req, res) => {
    const { user_id } = req.params
    const allPosts = await getAllPosts(user_id)
    if(Array.isArray(allPosts)){
        res.status(200).json(allPosts)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

posts.get('/:id', async (req, res) => {
    const { user_id, id } = req.params
    const singlePost = await getSinglePost(user_id, id)
    if(singlePost.id){
        res.status(200).json(singlePost)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

posts.post('/', async (req, res) => {
    const { user_id } = req.params
    const newPost = await createNewPost(user_id, req.body)
    if(newPost.id){
        res.status(200).json(newPost)
    }else {
        console.log(newPost)
        res.status(500).json({ error: "Internal Server Error"})
    }
})

posts.put('/:id', async (req, res) => {
    const { user_id, id } = req.params
    const updatedPost = await updatePost(user_id, req.body, id)
    if(updatedPost.id){
        res.status(200).json(updatedPost)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

posts.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletedPost = await deletePost(id)
    if(deletedPost.id){
        res.status(200).json({ success: "successfully deleted post"})
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

module.exports = posts;