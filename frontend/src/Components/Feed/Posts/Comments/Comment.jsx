import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { FaTimes, FaEdit } from "react-icons/fa";
import ProfilePic from "../../../../assets/default-profile.jpg";
import { useParams } from "react-router-dom";
import useEnterSubmit from "../../../../Hooks/useEnterSubmit";



const Comment = ({ comment, user_id, postId, setComments }) => {
    
    const { id } = useParams();
    const token = window.localStorage.getItem("token");
    const userLoggedIn = window.localStorage.getItem("user_id");
    const API = import.meta.env.VITE_BASE_URL;
    const textareaRef = useRef(null);
    const [editComment, setEditComment] = useState(false);
    const [user, setUser] = useState({});
    const [editedComment, setEditedComment] = useState({
        user_id: userLoggedIn,
        content: comment.content,
        post_id: postId,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
    });
    
    const handleDelete = () => {
        fetch(`${API}/users/${user_id}/posts/${postId}/comments/${comment.id}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        })
        .then((res) => res.json())
        .then((res) => {
            setComments((prevState) => {
                return prevState.filter((comm) => comm.id !== comment.id);
            });
        });
    };
    
    const handleEditComment = (e) => {
        setEditComment(!editComment);
    };
    
    const handleUpdate = () => {
        fetch(`${API}/users/${user_id}/posts/${postId}/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(editedComment),
        })
        .then((res) => res.json())
        .then((updatedComment) => {
            setComments((prevState) =>
                prevState.map((comm) =>
                    comm.id === updatedComment.id ? updatedComment : comm
        )
    );
    setEditComment(false);
})
.catch((err) => console.error(err));
};

const handleEnterSubmit = useEnterSubmit(handleUpdate);


useEffect(() => {
if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
    textareaRef.current.scrollHeight + "px";
}
}, [editedComment.content]);

useEffect(() => {
    fetch(`${API}/users/${comment.user_id}`)
    .then((res) => res.json())
    .then((res) => {
        setUser(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card className="mb-3 border-0 border-bottom">
      <Card.Body className="py-3">
        {comment.user_id == userLoggedIn && (
          <div className="absolute top-2 right-2 flex space-x-2">
            {comment.user_id == userLoggedIn && (
              <Button
                variant="link"
                className="p-1 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                title="Update Comment"
                onClick={handleEditComment}
              >
                <FaEdit size={16} />
              </Button>
            )}
            <Button
              variant="link"
              className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
              onClick={handleDelete}
              title="Delete Comment"
            >
              <FaTimes size={16} />
            </Button>
          </div>
        )}
        <div className="flex items-start">
          <img
            src={ProfilePic}
            alt={user?.username || "User"}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <h6 className="font-semibold mb-1">
              {user?.username || "Anonymous"}
            </h6>
            {!editComment ? (
              <>
                <p className="text-gray-700">{comment.content}</p>
              </>
            ) : (
                <>
                    <textarea
                        ref={textareaRef}
                        className="w-full p-2 border rounded resize-none overflow-hidden"
                        value={editedComment.content}
                        onChange={(e) => setEditedComment({ ...editedComment, content: e.target.value })}
                        onKeyDown={handleEnterSubmit}
                        style={{ minHeight: '1 em' }}
                    />
                    <Button variant="primary" onClick={handleUpdate} className="mt-2">
                        Save
                    </Button>
                </>            
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Comment;
