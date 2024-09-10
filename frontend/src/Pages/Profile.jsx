import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProfilePic from "../assets/default-profile.jpg";
import { useParams } from 'react-router-dom';

// COMPONENTS
import FriendsList from '../Components/Profile/FriendsList';
import Posts from '../Components/Profile/Posts';

const Profile = () => {

    const { id } = useParams();
    const API = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('token');
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

    return (
        <Container fluid className="h-full p-4 ">
            <Row className="h-full">
                {/* Left Sidebar */}
                <Col md={3} className="d-flex flex-column mb-4">
                    {/* Profile Picture */}
                    <Card className="shadow-lg rounded-lg mb-4 flex-grow-0 bg-white text-white">
                        <Card.Img variant="top" src={ProfilePic} alt="Profile Picture" />
                        <Card.Body>
                            <Card.Title className="text-center text-gray-500">{user.first_name} {user.last_name}</Card.Title>
                        </Card.Body>
                    </Card>

                    {/* Friends List Section */}
                    <Card className="shadow-lg rounded-lg flex-grow-0 bg-white text-gray-500">
                        <Card.Body>
                            <Card.Title className="text-center">Friends List</Card.Title>
                            <FriendsList />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Center Feed */}
                <Col md={9} className="d-flex flex-column mb-4 w-4/6">
                    <Card className="shadow-lg rounded-lg flex-grow-1 bg-white text-gray-500">
                        <Card.Body className="d-flex flex-column h-100">
                            <h5 className="text-center text-xl font-bold mb-4">User's Posts</h5>
                            {posts.map(post => {
                                return <Posts post={post} key={post.id}/>
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
