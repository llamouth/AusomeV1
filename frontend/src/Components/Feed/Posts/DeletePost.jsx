import React from 'react';
import { Button } from 'react-bootstrap';

const DeletePost = ({ setDeletePost, user_id, postId, setAllPosts, setRun }) => {
    const { localStorage } = window;
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_BASE_URL;

    const handleDelete = () => {
        fetch(`${API}/users/${user_id}/posts/${postId}`, {
            method: 'DELETE',
            headers: { "Authorization": token }
        })
        .then(res => res.json())
        .then(res => {
            setAllPosts((prevState) => {
                return prevState.filter(post => post.id !== postId);
            });
            setRun(prevState => !prevState);
            setDeletePost(false);
        })
        .catch(err => console.error(err));
        console.log(`Deleted post with ID: ${postId}`);
    };

    return (
        <>
            <div className='fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-999'onClick={() => setDeletePost(false)}></div>
            <div className='fixed top-1/2 left-1/2 bg-white p-5 rounded-lg shadow-md z-1000 text-center -translate-x-1/2 -translate-y-1/2 w-80'>
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-6">Are you sure you want to delete this post?</p>
                <div className="flex justify-around">
                    <Button 
                        variant="danger" 
                        onClick={handleDelete}>
                        Confirm
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => setDeletePost(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    );
};

export default DeletePost;
