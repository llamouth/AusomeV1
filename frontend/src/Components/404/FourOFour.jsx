import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const FourZeroFour = () => {

    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <div className="text-xl text-gray-600 mb-6">
                <p>Oops! The page you're looking for doesn't exist</p>{ !token && <p>or you need to <span><Link to="/login" className="text-blue-500 hover:underline">Log in</Link></span></p>  } {' '}
                
            </div>
            <Button as={Link} to="/" variant="primary" className="px-4 py-2">
                Go Home
            </Button>
        </div>
    );
};

export default FourZeroFour;
