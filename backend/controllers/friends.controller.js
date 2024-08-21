const express = require("express");
const friends = express.Router({ mergeParams: true});
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getAllFriends, removeFriend, getFriendshipStatus } = require("../queries/friends.queries");

friends.post("/request", async (req, res) => {
    const { user_id } = req.params;
    const { friend_id } = req.body;

    try {
        const result = await sendFriendRequest(user_id, friend_id);
        if (result.error) {
            res.status(400).json({ error: result.error });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to send friend request", details: error });
    }
});

friends.post("/accept", async (req, res) => {
    const { user_id } = req.params;
    const { friend_id } = req.body;

    try {
        const acceptedRequest = await acceptFriendRequest(user_id, friend_id);
        res.status(200).json(acceptedRequest);
    } catch (error) {
        res.status(500).json({ error: "Failed to accept friend request", details: error });
    }
});

friends.post("/reject", async (req, res) => {
    const { user_id } = req.params;
    const { friend_id } = req.body;

    try {
        const rejectedRequest = await rejectFriendRequest(user_id, friend_id);
        res.status(200).json(rejectedRequest);
    } catch (error) {
        res.status(500).json({ error: "Failed to reject friend request", details: error });
    }
});

friends.get("/", async (req, res) => {
    const { user_id } = req.params;

    try {
        const friendsList = await getAllFriends(user_id);
        res.status(200).json(friendsList);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve friends list", details: error });
    }
});

friends.delete("/remove", async (req, res) => {
    const { user_id } = req.params;
    const { friend_id } = req.body;

    try {
        const removedFriend = await removeFriend(user_id, friend_id);
        res.status(200).json({ success: `Successfully removed friend relationship`, removedFriend });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove friend", details: error });
    }
});

friends.get("/status/:friend_id", async (req, res) => {
    const { user_id, friend_id } = req.params;

    try {
        const status = await getFriendshipStatus(user_id, friend_id);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: "Failed to get friendship status", details: error });
    }
});

module.exports = friends;
