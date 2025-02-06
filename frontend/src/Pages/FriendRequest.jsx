import React, { createContext, useContext, useEffect, useState } from 'react';
import FriendRequestContainer from '../Components/FriendRequest/FriendRequestContainer';
import { AllContext } from '../Context/AllContext';

const FriendRequest = () => {

    const { pendingRequests, setPendingRequests } = useContext(AllContext)

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