import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTimes, FaEdit } from 'react-icons/fa';
import ProfilePic from '../../../../assets/default-profile.jpg'
import { useParams } from 'react-router-dom';

const Comment = ({ comment, user_id, postId, setComments }) => {

    const { id } = useParams()
    const token = window.localStorage.getItem('token')
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user_id'))
    const API = import.meta.env.VITE_BASE_URL
    const [editComment, setEditComment] = useState(false)
    const [editedComment, setEditedComment] = useState({
        user_id: "",
        content: ""
    })
    const [user, setUser] = useState({})


    const handleDelete = () => {
        fetch(`${API}/users/${user_id}/posts/${postId}/comments/${comment.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then( res => res.json() )
        .then( res => {
            setComments( (prevState) => {
                return prevState.filter( comm => comm.id !== comment.id )
            })
        })
    }

    const handleChange = (e) => {
        
    }

    const handleUpdate = () => {

    }

    useEffect(() => {
        fetch(`${API}/users/${comment.user_id}`)
        .then( res => res.json() )
        .then( res => {
            setUser(res)
        })
        .catch( err => console.error(err) )
    },[])

    return (
        <Card className="mb-3 border-0 border-bottom">
            <Card.Body className="py-3">
                {(userLoggedIn == id || comment.user_id == userLoggedIn) && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                        {comment.user_id == userLoggedIn && <Button variant="link" className="p-1 text-blue-500 hover:text-blue-700 transition-colors duration-200" title="Update Comment">
                            <FaEdit size={16} />
                        </Button>}
                        <Button variant="link"  className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200" onClick={handleDelete} title="Delete Comment">
                            <FaTimes size={16} />
                        </Button>
                    </div>   
                )}
                <div className="flex items-start">
                    <img src={ProfilePic} alt={user?.username || 'User'} className="w-8 h-8 rounded-full mr-3"/>
                    <div>
                        {!editComment ? 
                            <>
                                <h6 className="font-semibold mb-1">{user?.username || 'Anonymous'}</h6>
                                <p className="text-gray-700">{comment.content}</p>
                            </>
                        :
                            <>

                            </>
                        }
                        
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Comment;