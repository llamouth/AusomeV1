import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import Friend from './Friend';
import { Button } from 'react-bootstrap';

const FriendsList = () => {

    const { localStorage } = window;
    const { id } = useParams();
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');
    const [friends, setFriends] = useState([]);
    const [showAll, setShowAll] = useState(false); // State to track whether to show all friends

    useEffect(() => {
        fetch(`${API}/users/${id}/friends`, {
            headers: {
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(res => {
            setFriends(res);
        });
    }, [id]);

    const handleViewAll = () => {
        setShowAll(prevState => !prevState);
    };

    return (
        <div>
            <ul className='grid gap-3'>
                {friends.slice(0, showAll ? friends.length : 4).map(friend => {
                    return <Friend key={friend.id} friend={friend} />
                })}
            </ul>
            {(!showAll && friends.length > 4) ? (
                <Button variant='link' onClick={handleViewAll} className="text-blue-500 mt-2 no-underline">
                    View all friends
                </Button>
                
            )
            :
                friends.length > 4 && (
                    <Button variant='link' onClick={handleViewAll} className="text-blue-500 mt-2 no-underline">
                        Show less friends 
                    </Button>
                )
            }
        </div>
    );
};

export default FriendsList;
