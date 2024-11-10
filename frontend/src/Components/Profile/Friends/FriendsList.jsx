import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosRadioButtonOn } from "react-icons/io";
import Friend from './Friend';
import { Button } from 'react-bootstrap';
import FriendshipPopUp from './FriendshipPopUp';
import{ v4 as uuid} from 'uuid'


const FriendsList = () => {

    const { localStorage } = window;
    const { id } = useParams();
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');
    const userLoggedIn = localStorage.getItem('user_id');
    const [friends, setFriends] = useState([]);
    const [commonFriend, setCommonFriend] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [handleFriendship, setHandleFriendship] = useState(false);

    useEffect(() => {
        fetch(`${API}/users/${id}/friends`, {
            headers: {
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(res => {
            setFriends(res.filter(res => res.status === "accepted").map(user => ({...user, uuid: uuid()})));
        });
    }, [id]);

    useEffect(() => {
        const foundFriend = friends.find(friend => friend.id == userLoggedIn || friend.friend_id == userLoggedIn);
        if (foundFriend) {
            setCommonFriend(true);
        }else {
            setCommonFriend(false);
        }
    }, [friends]);

    const handleViewAll = () => {
        setShowAll(prevState => !prevState);
    };

    return (
        <div className="bg-white p-4  rounded-lg relative">
            {handleFriendship && <FriendshipPopUp setHandleFriendship={setHandleFriendship} commonFriend={commonFriend} setCommonFriend={setCommonFriend} setFriends={setFriends}/> }
            { id != userLoggedIn && <div className="absolute flex items-center px-2 py-1 rounded-full -top-9 -right-3 bg-gray-100 shadow-sm hover:cursor-pointer" onClick={() => setHandleFriendship(!handleFriendship)}>
                <IoIosRadioButtonOn className={`${commonFriend ? 'text-green-500' : 'text-red-500'}`} size={18} />
                <p className="hidden sm:inline-block text-gray-600 ml-2 text-sm">{commonFriend ? 'Friend' : 'Not Friends'}</p>
            </div> }

            {/* Friends List */}
            <ul className="space-y-3 ">
                {friends.slice(0, showAll ? friends.length : 4).map(friend => (
                    <Friend key={friend?.uuid} friend={friend} />
                ))}
            </ul>

            {/* View all/Show less button */}
            {(friends.length > 4) && (
                <Button variant="link" onClick={handleViewAll} className="text-blue-500 mt-3 block">
                    {showAll ? 'Show less friends' : 'View all friends'}
                </Button>
            )}
        </div>
    );
};

export default FriendsList;
