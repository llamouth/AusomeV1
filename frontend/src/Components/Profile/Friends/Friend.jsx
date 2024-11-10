import React from 'react';
import ProfilePic from "../../../assets/default-profile.jpg"
import { useNavigate, useParams } from 'react-router-dom';

const Friend = ({friend}) => {

    const navigate = useNavigate()
    const { id } = useParams()

    const handleClick = () => {
        navigate(`/${friend.friend_id == id ? friend.id : friend.friend_id}/profile`)
    }
   
    return (
        <li onClick={handleClick} className=' p-3 flex w-full rounded-lg shadow-sm gap-2 items-center justify-start hover:cursor-pointer hover:bg-gray-200'>
            <img src={ProfilePic} alt="" className='rounded-full h-9'/>
            <p className=''>{friend.username}</p>
        </li>
    );
};

export default Friend;