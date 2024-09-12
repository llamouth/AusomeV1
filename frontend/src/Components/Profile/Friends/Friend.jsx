import React from 'react';
import ProfilePic from "../../../assets/default-profile.jpg"
import { useNavigate } from 'react-router-dom';

const Friend = ({friend}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        console.log(friend)
        navigate(`/${friend.id}/profile`)
    }
   
    return (
        <li onClick={handleClick} className=' p-3 flex w-full rounded-lg shadow-sm gap-2 items-center justify-start hover:cursor-pointer hover:bg-gray-200'>
            <img src={ProfilePic} alt="" className='rounded-full h-9'/>
            <p>{friend.username}</p>
        </li>
    );
};

export default Friend;