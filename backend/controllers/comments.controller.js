const express = require('express')
const comments = express.Router({ mergeParams: true })
const { getAllComments, createComment, updateComment, deleteComment } = require("../queries/comments.queries")

comments.get('/', async (req, res) => {
    const { post_id } = req.params
    const allComments = await getAllComments(post_id)
    if(Array.isArray(allComments)){
        res.status(200).json(allComments)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

comments.post('/', async (req, res) => {
    const { post_id } = req.params
    const newComment = await createComment(post_id, req.body)
    if(newComment.id){
        res.status(200).json(newComment)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

comments.put('/:id', async (req, res) => {
    const { post_id, id } = req.params
    const commentUpdated = await updateComment(post_id, id, req.body)
    if(commentUpdated.id){
        res.status(200).json(commentUpdated)
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

comments.delete('/:id', async (req, res) => {
    const { id } = req.params
    const commentDeleted = await deleteComment(id)
    if(commentDeleted.id){
        res.status(200).json({ success: "Successfully deleted comment"})
    }else {
        res.status(500).json({ error: "Internal Server Error"})
    }
})

module.exports = comments