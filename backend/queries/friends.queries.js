const db = require("../db/dbConfig");

// Send a friend request
const sendFriendRequest = async (user_id, friend_id) => {
    try {
        // Check if the users are already friends
        const existingFriendship = await db.oneOrNone(
            "SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2 AND status = 'accepted') OR (user_id = $2 AND friend_id = $1 AND status = 'accepted')",
            [user_id, friend_id]
        );

        if (existingFriendship) {
            return { error: "You are already friends with this user" };
        }

        // Check if a pending request already exists
        const pendingRequest = await db.oneOrNone(
            "SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2 AND status = 'pending') OR (user_id = $2 AND friend_id = $1 AND status = 'pending')",
            [user_id, friend_id]
        );

        if (pendingRequest) {
            return { error: "A pending friend request already exists" };
        }

        // Insert new friend request
        const newFriendRequest = await db.one(
            "INSERT INTO friends (user_id, friend_id, status) VALUES ($1, $2, 'pending') RETURNING *",
            [user_id, friend_id]
        );
        return newFriendRequest;
    } catch (error) {
        return error;
    }
};

// Accept a friend request
const acceptFriendRequest = async (user_id, friend_id) => {
    try {
        const acceptedRequest = await db.one(
            "UPDATE friends SET status = 'accepted' WHERE user_id = $1 AND friend_id = $2 RETURNING *",
            [friend_id, user_id]
        );
        return acceptedRequest;
    } catch (error) {
        return error;
    }
};

// Reject a friend request
const rejectFriendRequest = async (user_id, friend_id) => {
    try {
        const rejectedRequest = await db.one(
            "UPDATE friends SET status = 'rejected' WHERE user_id = $1 AND friend_id = $2 RETURNING *",
            [friend_id, user_id]
        );
        return rejectedRequest;
    } catch (error) {
        return error;
    }
};

// Get all friends for a user
const getAllFriends = async (user_id) => {
    try {
        const friendsList = await db.any(
            `SELECT users.id, users.username, users.profile_picture, friends.status 
             FROM friends 
             JOIN users 
             ON (users.id = friends.friend_id AND friends.user_id = $1)
             OR (users.id = friends.user_id AND friends.friend_id = $1)`,
            [user_id]
        );
        return friendsList;
    } catch (error) {
        return error;
    }
};

// Remove a friend
const removeFriend = async (user_id, friend_id) => {
    try {
        const removedFriend = await db.one(
            "DELETE FROM friends WHERE (user_id = $2 AND friend_id = $1 OR user_id = $1 AND friend_id = $2) RETURNING *",
            [user_id, friend_id]
        );
        return removedFriend;
    } catch (error) {
        return error;
    }
};

// Get the friendship status between two users
const getFriendshipStatus = async (user_id, friend_id) => {
    try {
        const status = await db.oneOrNone(
            "SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)",
            [user_id, friend_id]
        );
        return status;
    } catch (error) {
        return error;
    }
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getAllFriends,
    removeFriend,
    getFriendshipStatus,
};
