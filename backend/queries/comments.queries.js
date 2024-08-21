const db = require('../db/dbConfig')

const getAllComments = async (post_id) => {
    try {
        const allComments = await db.any('SELECT * FROM comments WHERE post_id=$1', post_id)
        return allComments  
    } catch (error) {
        return error
    }
}

const createComment = async (post_id, comment) => {
    try {
        const { user_id, content } = comment
        const newComment = await db.one('INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *', [user_id, post_id, content])
        return newComment
    } catch (error) {
        return error
    }
}

const updateComment = async (post_id, id, comment) => {
    try {
        const { user_id, content } = comment
        const commentUpdated = await db.one('UPDATE comments SET user_id=$1, post_id=$2, content=$3 WHERE id=$4 RETURNING *', [user_id, post_id, content, id])
        return commentUpdated
    } catch (error) {
        return error
    }
}

const deleteComment = async (id) => {
    try {
        const commentDeleted = await db.one('DELETE FROM comments WHERE id=$1 RETURNING *', id)
        return commentDeleted
    } catch (error) {
        return error
    }
}

module.exports = { getAllComments, createComment, updateComment, deleteComment }