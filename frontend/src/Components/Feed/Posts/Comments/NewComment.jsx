import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import ProfilePic from '../../../../assets/default-profile.jpg';
import { useParams } from 'react-router-dom';

const { localStorage } = window

const NewComment = ({ user_id, postId, setComments }) => {

    const userLoggedIn = JSON.parse(localStorage.getItem('user_id'))
    const [newComment, setNewComment] = useState({
        user_id: userLoggedIn,
        content: ""
    });
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setNewComment((prevState) => {
            const value = e.target.value;
            return {...prevState, content: value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.content.trim()) return;
        console.log(newComment)

        fetch(`${API}/users/${user_id}/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(res => {
            setNewComment({
                user_id: userLoggedIn,
                content:""
            });
            setComments(prevState => [...prevState, res]);
        })
        .catch(err => console.error('Error adding comment:', err));
    };

    return (
        <Card className="mb-3 border-0 border-bottom border-gray-950">
            <Card.Body className="p-3">
                <Form onSubmit={handleSubmit}>
                    <div className="flex items-start">
                        <img src={ProfilePic} alt="Your profile" className="w-8 h-8 rounded-full mr-3"/>
                        <Form.Group className="flex-grow">
                            <Form.Control as="textarea" rows={2} placeholder="Write a comment..." value={newComment.content}  onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                        </Form.Group>
                    </div>
                    <div className="mt-2 text-right">
                        <Button type="submit" variant="primary" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Post Comment</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default NewComment; 