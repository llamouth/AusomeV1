import React, { useContext } from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AllContext } from '../Context/AllContext';
const { localStorage } = window

const NavBar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user_id');
    const { pendingRequests } = useContext(AllContext)
    
    const handleClick = () => { 
        if(token) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            navigate('/')
        }else {
            navigate("/login");
        }
    }

    return (
        <div className="flex justify-between items-center h-16 w-full border-b border-border shadow-navbar px-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo" className="h-10" />
                <p className="text-2xl font-semibold text-text">Ausome</p>
            </div>
            <div className="flex gap-4 items-center">
                {token && 
                    <>
                        <Button onClick={() => navigate(`/${user}/feed`)} className="text-text bg-transparent border-0 hover:text-primary transition-colors duration-300">Feed</Button>
                        <Button onClick={() => navigate(`/${user}/friend-requests`)} className="text-text bg-transparent border-0 hover:text-primary transition-colors duration-300">Friend Requests</Button>
                        {pendingRequests.length > 0 && <div className='rounded-full bg-red-600 w-6 text-center absolute text-white right-28 top-0'>{pendingRequests.length}</div>}
                        
                    </>
                }
                <Button onClick={handleClick} className="text-text bg-transparent border-0 hover:text-danger transition-colors duration-300" >
                    { token ? "Logout" : "Login" }
                </Button>
            </div>
        </div>
    );
};

export default NavBar;
