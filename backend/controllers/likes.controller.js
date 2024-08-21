const express = require('express')
const likes = express.Router({ mergeParams: true })
const { getAllLikes, likePost, deleteLike } = require('../queries/likes.queries')

likes.get('/', async (req, res) => {
    const { post_id } = req.params
    const allLikes = await getAllLikes(post_id)
    if(Array.isArray(allLikes)) {
        res.status(200).json(allLikes)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

likes.post('/', async (req, res) => {
    const { post_id } = req.params
    const likedPost = await likePost(post_id, req.body.user_id)
    if(likedPost.id) {
        res.status(201).json(likedPost)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

likes.delete('/:id', async (req, res) => {
    const { id } = req.params
    const likeDeleted = await deleteLike(id)
    if(likeDeleted.id){
        res.status(200).json({ success: "Successfully unliked post"})
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

module.exports = likes