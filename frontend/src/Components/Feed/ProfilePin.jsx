import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ProfilePic from '../../assets/default-profile.jpg'

const ProfilePin = () => {
    
    const { id } = useParams() 
    const API = import.meta.env.VITE_BASE_URL;
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`${API}/users/${id}`)
        .then( res => res.json())
        .then( res => {
            setUser(res)
        })
        .catch( err => console.error(err) );
    }, [])

    return (
        <>
            <img src={ProfilePic} alt="Profile Picture" />
            <p>{user.first_name} {user.last_name}</p>
            <Button as={Link} to={`/${user.id}/profile`} className='bg-transparent text-blue-400 border-blue-400 hover:text-blue-700'>View Profile</Button>
        </>
    );
};

export default ProfilePin;