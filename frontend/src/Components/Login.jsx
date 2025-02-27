import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
                console.log(res);
                localStorage.setItem('token', res.token);
                localStorage.setItem('user_id', res.user.id);
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
            <div className="w-full max-w-m p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Input */}
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={current.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            name="password_hash"
                            value={current.password_hash}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>

                {/* Signup Redirect */}
                <p 
                    className="mt-4 text-center text-blue-500 cursor-pointer hover:underline" 
                    onClick={() => navigate('/signup')}
                >
                    SIGN UP
                </p>
            </div>
        </div>
    );
};

export default Login;
