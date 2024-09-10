import React from 'react';
import ProfilePic from "../../assets/default-profile.jpg"
import { useNavigate } from 'react-router-dom';

const Friend = ({friend}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        console.log(friend)
        navigate(`/${friend.id}/profile`)
    }
   
    return (
        <li>
            <div onClick={handleClick} className=' p-3 flex gap-2 items-center justify-start rounded-lg bg-gray-200 hover:cursor-pointer'>
                <img src={ProfilePic} alt="" className='rounded-full h-9'/>
                <p>{friend.username}</p>
            </div>
        </li>
    );
};

export default Friend;