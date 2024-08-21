const db = require("../db/dbConfig")
const bcrypt = require('bcrypt')

const getAllUsers = async () => {
    try {
        const allUsers = await db.any("SELECT * FROM users")
        return allUsers
    } catch (error) {
        return error
    }
}

const getSingleUser = async (id) => {
    try {
        const singleUser = await db.one("SELECT * FROM users WHERE id=$1", id)
        return singleUser
    } catch (error) {
        return error
    }
}

const updateUser = async (id, user) => {
    try {
        const { username, email, password_hash, profile_picture, bio } = user
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const updatedUser = await db.one("UPDATE users SET email=$1, username=$2, password_hash=$3, profile_picture=$4, bio=$5 WHERE id=$6 RETURNING *", [email, username, hash, profile_picture, bio, id])
        return updatedUser
    } catch (error) {
        return error
    }
}

const createUser = async (user) => {
    try {
        const { username, email, password_hash, profile_picture, bio } = user

        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const newUser = await db.one("INSERT INTO users (email, username,password_hash, profile_picture, bio) VALUES($1, $2, $3, $4, $5) RETURNING *", [email, username, hash, profile_picture, bio])
        return newUser
    } catch (err) {
        return err
    }
}

const loginUser = async (user) => {
    try {
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username)
        if(!loggedInUser){
            return false
        }

        const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)
        if(!passwordMatch){
            return false
        }
        return loggedInUser
    } catch (err) {
        return err
    }
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one("DELETE FROM users WHERE id=$1 RETURNING *", id)
        return deletedUser
    } catch (error) {
        return error
    }
}

module.exports = { createUser, getAllUsers, getSingleUser, loginUser, deleteUser, updateUser }