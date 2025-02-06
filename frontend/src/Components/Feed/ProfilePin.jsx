import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ProfilePic from '../../assets/default-profile.jpg'
import { AllContext } from '../../Context/AllContext';

const ProfilePin = () => {
    
    const {  user } = useContext(AllContext)

    return (
        <>
            <img src={ProfilePic} alt="Profile Picture" />
            <p>{user.first_name} {user.last_name}</p>
            <Button as={Link} to={`/${user.id}/profile`} className='bg-transparent text-blue-400 border-blue-400 hover:text-blue-700'>View Profile</Button>
        </>
    );
};

export default ProfilePin;