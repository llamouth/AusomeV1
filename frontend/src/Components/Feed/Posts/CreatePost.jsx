import React, { useState, useContext } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';  
import { AllContext } from '../../../Context/AllContext';

const { localStorage } = window;

const CreatePost = () => {
    const { id } = useParams();
    const { setAllPosts} = useContext(AllContext)
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');

    const [post, setPost] = useState({
        content: "",
        image_url: "",
    });

    const [showImageInput, setShowImageInput] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevState) => {
           return { ...prevState, [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API}/users/${id}/posts`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: { 
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            setAllPosts((prevState) => [res, ...prevState]);
            setPost({
                content: "",
                image_url: ""
            });
        })
        .catch(error => console.error('Error:', error));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !post.content.includes("\n") && post.content) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const toggleImageInput = () => {
        setShowImageInput((prevState) => !prevState);
    };

    return (
        <Card className="shadow-lg rounded-lg mb-4 p-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="createPost">
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="content"
                                placeholder="What's on your mind?"
                                value={post.content}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className="resize-none pr-12 min-h" 
                            />
                            <InputGroup.Text
                                onClick={toggleImageInput}
                                className="cursor-pointer border-0 text-gray-500"
                                style={{ borderRadius: '0 0.375rem 0.375rem 0' }}  // Light gray color
                            >
                                <FaImage size={24} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {showImageInput && (
                        <Form.Group controlId="imageUrl" className="mt-2">
                            <Form.Control
                                type="text"
                                name="image_url"
                                placeholder="Enter image URL"
                                value={post.image_url}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit" className="mt-3">
                        Post
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreatePost;
