import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes, FaThumbsUp, FaCommentDots, FaShareAlt } from 'react-icons/fa';
import ProfilePic from '../../../assets/default-profile.jpg';

// COMPONENTS
import DeletePost from './DeletePost';
import CommentsContainer from './Comments/CommentsContainer';

const { localStorage } = window;

const Posts = ({ post, setAllPosts, setRun }) => {

    const navigate = useNavigate()
    const postId = post.id;
    const { id } = useParams(); 
    const newLike = { user_id: id };
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');
    const { content, image_url, user_id } = post;
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [likedPost, setLikedPost] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleLike = (e) => {
        if (likedPost) {
            const liked = likes.find(like => like.user_id == id);

            fetch(`${API}/users/${user_id}/posts/${postId}/likes/${liked.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(res => {
                setLikedPost(false);
                setLikes(prevState => prevState.filter(like => like.id !== liked.id));
            })
            .catch(err => console.error(err));
        } else {
            fetch(`${API}/users/${user_id}/posts/${postId}/likes`, {
                method: 'POST',
                body: JSON.stringify(newLike),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(res => {
                setLikes(prevState => [ ...prevState, res ]);
                setLikedPost(true);
            })
            .catch(err => console.error(err));
        }
    };
    
    useEffect(() => {
        fetch(`${API}/users/${user_id}`)
            .then(res => res.json())
            .then(res => {
                setUser(res);
            })
            .catch(err => console.error(err));

        fetch(`${API}/users/${user_id}/posts/${postId}/likes`, {
            headers: { 'Authorization': token}
        })
        .then( res => res.json() )
        .then(res => {
            const liked = res.find( like => like.user_id == id)
            if(liked){setLikedPost(true)}
            setLikes(res);
        });

        fetch(`${API}/users/${user_id}/posts/${postId}/comments`, {
            headers: {
                "Authorization": token
            }
        })
        .then( res => res.json() )
        .then ( res => {
            setComments(res);
        });
        
    }, [user_id, API]);

    return (
        <>
            {deletePost && 
                <DeletePost setDeletePost={setDeletePost} user_id={user_id} postId={postId} setAllPosts={setAllPosts} setRun={setRun} />
            }
            <Card className="mb-4 shadow-sm border-gray-300">
                <Card.Body className="p-4 relative">
                    {user_id === +id && (
                        <Button variant="link" className="position-absolute top-0 end-0 text-border" onClick={() => setDeletePost(true)}>
                            <FaTimes size={20} />
                        </Button>
                    )}
                    <div className="flex items-center mb-4 hover:cursor-pointer hover:animate-bounce" onClick={() => navigate(`/${user.id}/profile`)}>
                        <img src={ProfilePic} alt={user.username} className="w-10 h-10 rounded-full mr-4" />
                        <div className='' >
                            <Card.Title className="mb-0 text-lg font-roboto" >
                                {user.first_name} {user.last_name}
                            </Card.Title>
                            <Card.Text className="text-sm text-gray-600">@{user.username}</Card.Text>
                        </div>
                    </div>
                    <Card.Text className="text-gray-800">{content}</Card.Text>
                    {image_url && (
                        <img src={image_url} alt="Post content" className="w-full rounded-lg mt-2" />
                    )}
                </Card.Body>
                <Card.Footer className="bg-white border-t border-gray-200 flex justify-around items-center">
                    <Button variant="link" onClick={handleLike} className={`flex items-center no-underline ${
                            likedPost ? 'text-blue-700' : 'text-blue-500 hover:text-blue-700'
                        }`}>
                        <FaThumbsUp className="mr-2" /> {likes.length}
                    </Button>
                    <Button variant="link" className="text-blue-500 hover:text-blue-700 flex items-center no-underline" onClick={() => setShowComments(!showComments)}>
                        <FaCommentDots className="mr-2" /> {comments.length} Comments
                    </Button>
                    {/* <Button variant="link" className="text-blue-500 hover:text-blue-700 flex items-center no-underline">
                        <FaShareAlt className="mr-2" /> Share
                    </Button> */}
                </Card.Footer>
                {showComments && (
                    <div className="bg-gray-100 p-4 border-t border-gray-300 mt-2">
                        <CommentsContainer user_id={user_id} postId={postId} setComments={setComments} comments={comments} setShowComments={setShowComments}/>
                    </div>
                )}
            </Card>
        </>
    );
};

export default Posts;
