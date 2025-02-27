import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const { localStorage } = window;

const SignUp = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password_hash: "",
        email: ""
    });

    const [shake, setShake] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility

    const handleChange = (e) => {
        setNewUser((prevState) => {
            return {...prevState,[e.target.name]: e.target.value}
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newUser.first_name || !newUser.last_name || !newUser.username || !newUser.password_hash || !newUser.email) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        fetch(`${API}/users`, {
            method: 'POST',
            body: JSON.stringify(newUser),
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
                localStorage.setItem('user_id', JSON.stringify(res.user.user_id));
                navigate(`/${res.user.user_id}/feed`);
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96  p-6 bg-white border border-gray-300 shadow-lg rounded-lg grid animate-shake" >
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <Form onSubmit={handleSubmit} className="space-y-4">
                    <Form.Group controlId="formFirstName">
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            value={newUser.first_name}
                            onChange={handleChange}
                            className={`rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${(shake && !newUser.first_name) && 'border-red-600'}`}
                        />
                        <Form.Text>Please Enter a First Name</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            value={newUser.last_name}
                            onChange={handleChange}
                            className={`rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${(shake && !newUser.last_name) && 'border-red-600'}`}
                        />
                        <Form.Text>Please Enter a Last Name</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            className={`rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${(shake && !newUser.username) && 'border-red-600'}`}
                        />
                        <Form.Text>Please Enter a Username</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            className={`rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${(shake && !newUser.email) && 'border-red-600'}`}
                        />
                        <Form.Text>Please Enter an Email</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="relative">
                        <Form.Control
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            name="password_hash"
                            value={newUser.password_hash}
                            onChange={handleChange}
                            className={`rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${(shake && !newUser.password_hash) && 'border-red-600'}`}
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)} 
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='relative bottom-3 text-gray-500'/>
                        </span>
                        <Form.Text>Please Enter a Password</Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-full">Sign Up</Button>
                </Form>
                <Button as={Link} to='/login' variant='link' className="mt-4 text-center cursor-pointer self-center no-underline">
                    LOG IN
                </Button>
            </div>
        </div>
    );
};

export default SignUp;
