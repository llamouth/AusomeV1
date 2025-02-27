import React from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

const FriendshipPopUp = ({ setHandleFriendship, commonFriend, setCommonFriend, setFriends }) => {

    const API = import.meta.env.VITE_BASE_URL
    const { id } = useParams()
    const userLoggedInId = window.localStorage.getItem('user_id')
    const token = window.localStorage.getItem('token')
    // Function to handle adding or removing a friend
    const handleFriendshipAction = () => {
        if (commonFriend) {
            fetch(`${API}/users/${userLoggedInId}/friends/remove`, {
                method: 'DELETE',
                body: JSON.stringify({friend_id: id}),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then( res => res.json() )
            .then( res => {
                setFriends( prevState => {
                    return prevState.filter( friend => friend.id != userLoggedInId )
                })
                setCommonFriend(false)
            })
        } else {
            fetch(`${API}/users/${userLoggedInId}/friends/request`, {
                method: 'POST',
                body: JSON.stringify({friend_id: id}),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then( res => res.json())
            .then( res => {
                
            })
        }
        setHandleFriendship(false);
    };

    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-999'></div> 
            
            <div className='fixed top-1/2 left-1/2 bg-white p-5 rounded-lg shadow-md z-1000 text-center -translate-x-1/2 -translate-y-1/2 w-80'>
                
                {commonFriend ? 
                    <>
                        <p className="text-lg font-semibold mb-4">You are friends with this user.</p>
                        <Button 
                            variant="danger" 
                            onClick={handleFriendshipAction}
                            className="w-full"
                        >
                            Remove Friend
                        </Button>
                    </>
                :
                    <>
                        <p className="text-lg font-semibold mb-4">You are not friends with this user.</p>
                        <Button 
                            variant="primary" 
                            onClick={handleFriendshipAction}
                            className="w-full"
                        >
                            Add Friend
                        </Button>
                    </>
                }

                <Button 
                    variant="secondary" 
                    onClick={() => setHandleFriendship(false)} 
                    className="mt-4 w-full"
                >
                    Cancel
                </Button>
            </div>
        </>
    );
};

export default FriendshipPopUp;
