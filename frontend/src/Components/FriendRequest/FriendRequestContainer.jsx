import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePic from '../../assets/default-profile.jpg';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FriendRequestContainer = ({ friend, setPendingRequests }) => {
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const userLoggedIn = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');

    const handleAccept = () => {
        fetch(`${API}/users/${userLoggedIn}/friends/accept`, {
            method: 'POST',
            body: JSON.stringify({ friend_id: friend.id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(() => {
            navigate(`/${friend.id}/profile`);
        });
    };

    const handleDenial = () => {
        fetch(`${API}/users/${userLoggedIn}/friends/reject`, {
            method: 'POST',
            body: JSON.stringify({ friend_id: friend.id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(() => {
            setPendingRequests(prevState => prevState.filter(user => user.id !== friend.id));
        });
    };

    return (
        <Card key={friend.id} className="w-80 mb-4 shadow-lg">
            <img 
                src={ProfilePic || 'https://via.placeholder.com/150'} 
                alt={`${friend.first_name} ${friend.last_name}`} 
                className="object-cover h-40 w-full rounded-t-lg"
            />
            <CardContent className="text-center space-y-2">
                <h3 className="text-lg font-semibold">{friend.first_name} {friend.last_name}</h3>
                <p className="text-sm text-gray-500">@{friend.username}</p>
                <div className="flex justify-around mt-3">
                    <Button className="bg-green-500 hover:bg-green-600" onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={handleDenial}>
                        Reject
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FriendRequestContainer;
