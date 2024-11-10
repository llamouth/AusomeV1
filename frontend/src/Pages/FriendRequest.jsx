import React, { createContext, useEffect, useState } from 'react';
import FriendRequestContainer from '../Components/FriendRequest/FriendRequestContainer';
import{ v4 as uuid} from 'uuid'

const FriendRequest = () => {

    const API = import.meta.env.VITE_BASE_URL
    const userLoggedIn = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');
    const [ pendingRequests, setPendingRequests ] = useState([])
    

    useEffect(() => {
        fetch(`${API}/users/${userLoggedIn}/friends/`, {
            headers: { 'Authorization' : token }
        })
        .then( res => res.json() )
        .then( res => {
            setPendingRequests(res.filter( friend => friend.status === 'pending' && friend.id != userLoggedIn ).map(user => ({...user, uuid: uuid()}))) // In the database the friend.id is the user who sent the request so you should not be able to see the request you sent only the request sent to you
        })
        .catch( err => console.error( err ) )
    }, [])

    useEffect(() => {
        const pendingCount = createContext(pendingRequests.length)
        console.log(pendingCount)
    },[pendingRequests])

    return (
        <div className="flex flex-col items-center p-4">
        {pendingRequests.length > 0 ? (
            pendingRequests.map((friend) => (
                <FriendRequestContainer key={friend?.uuid} id={friend.id} friend={friend} setPendingRequests={setPendingRequests}/>
            ))
        ) : (
            <p className="text-gray-500 text-lg">No pending friend requests.</p>
        )}
    </div>
    );
};

export default FriendRequest;