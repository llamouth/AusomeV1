const db = require("../db/dbConfig")

const getAllPosts = async (user_id) => {
    try {
        const allPosts = await db.any('SELECT * FROM posts WHERE user_id=$1', user_id)
        return allPosts
    } catch (error) {
        return error
    }

}

const getSinglePost = async (user_id, id) => {
    try {
        const singlePost = await db.one('SELECT * FROM posts WHERE user_id=$1 AND id=$2', [user_id, id])
        return singlePost
    } catch (error) {
        return error
    }
}

const createNewPost = async (user_id, post) => {
    try {
        const {content, media} = post
        const newPost = await db.one('INSERT INTO posts (user_id, content, media) VALUES($1, $2, $3) RETURNING *', [user_id, content, media])
        return newPost
    } catch (error) {
        return error
    }
}

const updatePost = async (user_id, post, id) => {
    try {
        const {content, media} = post
        const updatedPost = await db.one('UPDATE posts SET user_id=$1, content=$2, media=$3 WHERE id=$4 RETURNING *', [user_id, content, media, id])
        return updatedPost
    } catch (error) {
        return error
    }
}

const deletePost = async (id) => {
    try {
        const deletedPost = await db.one('DELETE FROM posts WHERE id=$1 RETURNING *', id)
        return deletedPost;
    } catch (error) {
        return error
    }
}

module.exports = { getAllPosts, getSinglePost, createNewPost, updatePost, deletePost }