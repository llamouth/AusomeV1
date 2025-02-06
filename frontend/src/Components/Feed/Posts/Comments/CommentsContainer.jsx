import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

//COMPONENTS
import Comment from './Comment';
import NewComment from './NewComment';

const CommentsContainer = ({ user_id, postId, setComments, comments, setShowComments }) => {

    const toggleVisibility = () => {
        setShowComments((prevState) => {
            return !prevState
        });
    };

    return (
        <Card className="mt-3 border-top-0 relative">
            <Button variant="outline-secondary" className="absolute top-0 right-0 m-2 p-0 border-none h-8 flex items-center justify-center" onClick={toggleVisibility}> Close </Button>
            <Card.Body className="p-0">
                <h5 className="font-semibold mb-3 px-3 pt-3"> Comments</h5>
                <NewComment user_id={user_id} postId={postId} setComments={setComments} />
                <div className="max-h-96 overflow-y-auto">
                    {comments.map(comment => {
                        return <Comment user_id={user_id} key={comment.id} postId={postId} comment={comment} setComments={setComments} />
                    })}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CommentsContainer;
