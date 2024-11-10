import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProfilePic from "../assets/default-profile.jpg";
import { useParams } from 'react-router-dom';

// COMPONENTS
import FriendsList from '../Components/Profile/Friends/FriendsList';
import Posts from '../Components/Profile/Posts';

const Profile = () => {

    const { id } = useParams();
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');
    const userLoggedIn = localStorage.getItem('user_id')
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${API}/users/${id}`)
        .then( res => res.json())
        .then ( res => {
            setUser(res);
        })
        .catch( err => console.error(err));

        fetch(`${API}/users/${id}/posts`, {
            headers: {
                "Authorization": token
            }
        })
        .then( res => res.json() )
        .then( res => {
            setPosts(res);
        });
    }, [id]);

    useEffect(() => {
        // if(userLoggedIn)
    }, [id])

    return (
        <Container fluid className="h-full p-4">
            <Row className="h-full">
                {/* Left Sidebar */}
                <Col md={3} className="d-flex flex-column space-y-4">
                    {/* Profile Picture */}
                    <Card className="shadow-lg rounded-lg mb-4 bg-white">
                        <Card.Img variant="top" src={ProfilePic} alt="Profile Picture" />
                        <Card.Body>
                            <Card.Title className="text-center text-gray-800">{user.first_name} {user.last_name}</Card.Title>
                        </Card.Body>
                    </Card>

                    {/* Friends List Section */}
                    <Card className="shadow-lg rounded-lg bg-white">
                        <Card.Body>
                            <Card.Title className=" text-gray-800">Friends List</Card.Title>
                            <FriendsList />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Center Feed */}
                <Col md={9} className="d-flex flex-column space-y-4">
                    <Card className="shadow-lg rounded-lg bg-white flex-grow-1">
                        <Card.Body className="d-flex flex-column h-100">
                            <h5 className="text-center text-xl font-bold mb-4">User's Posts</h5>
                            {posts.map(post => (
                                <Posts post={post} key={post.id} />
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
