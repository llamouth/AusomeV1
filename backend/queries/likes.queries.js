const db = require('../db/dbConfig')

const getAllLikes = async (post_id) => {
    try {
        const allLikes = await db.any('SELECT * FROM likes WHERE post_id=$1', post_id)
        return allLikes
    } catch (error) {
        return error
    }
}

const likePost = async (post_id, user_id) => {
    try {
        const postLiked = await db.one('INSERT INTO likes (user_id, post_id) VALUES($1, $2) RETURNING *', [user_id, post_id])
        return postLiked 
    } catch (error) {
        return error 
    }
}

const deleteLike = async (id) => {
    try {
        const likeDeleted = await db.one('DELETE FROM likes WHERE id=$1 RETURNING *', id)
        return likeDeleted
    } catch (error) {
        return error
    }
}

module.exports = { getAllLikes, deleteLike, likePost }