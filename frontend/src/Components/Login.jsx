import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const { localStorage } = window;

const Login = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState({
        username: "",
        password_hash: ""
    });

    const handleChange = (e) => {
        setCurrent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API}/users/login`, {
            method: 'POST',
            body: JSON.stringify(current),
            headers: { 
                'Content-Type': 'application/json' 
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res?.error) {
                console.error(res);
            } else {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user_id', JSON.stringify(res.user.id));
                navigate(`/${res.user.id}/feed`);
            }
        })
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetch(`${API}/users`)
            .then(res => res.json())
            .then(res => setUsers(res))
            .catch(err => console.error(err));
    }, [API]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <Form onSubmit={handleSubmit} className="space-y-4">
                    <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={current.username}
                            onChange={handleChange}
                            required
                            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password_hash"
                            value={current.password_hash}
                            onChange={handleChange}
                            required
                            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-full">Log In</Button>
                </Form>
                <p className="mt-4 text-center text-blue-500 cursor-pointer" onClick={() => navigate('/signup')}>
                    SIGN UP
                </p>
            </div>
        </div>
    );
};

export default Login;
