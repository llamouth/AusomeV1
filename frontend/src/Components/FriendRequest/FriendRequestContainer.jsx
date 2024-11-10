import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProfilePic from '../../assets/default-profile.jpg'

const FriendRequestContainer = ({ friend, setPendingRequests }) => {

    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const userLoggedIn = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');

    const handleAccept = () => {
        fetch(`${API}/users/${userLoggedIn}/friends/accept`,{
            method: 'POST',
            body: JSON.stringify({friend_id: friend.id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then( res => res.json() )
        .then( res => {
            navigate(`/${friend.id}/profile`)
        })
    }

    const handleDenial = () => {
        fetch(`${API}/users/${userLoggedIn}/friends/reject`, {
            method: 'POST',
            body: JSON.stringify({friend_id: friend.id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then( res => {
            setPendingRequests(prevState => {
                return prevState.filter( user => user.id != friend.id)
            })
        })
    }

    return (
        <Card key={friend.id} className="w-80 mb-4 shadow-lg">
            {/* Add profile image */}
            <Card.Img variant="top" src={ProfilePic || 'https://via.placeholder.com/150'} alt={`${friend.first_name} ${friend.last_name}`}className="object-cover h-40 w-full rounded-t-lg"/>
            <Card.Body className="text-center">
                <Card.Title className="text-lg font-semibold">{friend.first_name} {friend.last_name}</Card.Title>
                <Card.Text>@{friend.username}</Card.Text>
                <div className="flex justify-around mt-3">
                    <Button variant="success" onClick={handleAccept}>Accept</Button>
                    <Button variant="danger" onClick={handleDenial}>Reject</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FriendRequestContainer;
