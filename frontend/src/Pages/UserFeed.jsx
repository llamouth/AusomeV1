import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProfilePin from '../Components/Feed/ProfilePin';
import PostsContainer from '../Components/Feed/Posts/PostContainer';
import ResourcesContainer from '../Components/Feed/Resources/ResourcesContainer';
import CreatePost from '../Components/Feed/Posts/CreatePost';
import { useParams } from 'react-router-dom';
import FourZeroFour from '../Components/404/FourOFour';

const UserFeed = () => {
    const { id } = useParams(); 
    const user = localStorage.getItem('user_id');
    const [allPosts, setAllPosts] = useState([]);

    if(id != user) {
        return <FourZeroFour/>
    }

    return (
        <Container fluid className="h-full p-4">
            <Row className="h-full">
                {/* Left Sidebar */}
                <Col md={3} className="d-flex flex-column mb-4">
                    {/* Profile Pin */}
                    <Card className="shadow-lg rounded-lg mb-4 flex-grow-0">
                        <Card.Body>
                            <ProfilePin />
                        </Card.Body>
                    </Card>

                    {/* Resources Section */}
                    <Card className="shadow-lg rounded-lg flex-grow-0">
                        <Card.Body>
                            <ResourcesContainer />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Center Feed */}
                <Col md={6} className="d-flex flex-column mb-4 w-4/6">
                    <CreatePost setAllPosts={setAllPosts}/>

                    <Card className="shadow-lg rounded-lg flex-grow-1">
                        <Card.Body className="d-flex flex-column h-100">
                            <h5 className="text-center text-xl font-bold mb-4 font-roboto">Feed</h5>
                            <div className="flex-1 overflow-auto">
                                <PostsContainer allPosts={allPosts} setAllPosts={setAllPosts}/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserFeed;
