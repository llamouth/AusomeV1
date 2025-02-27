import React, {createContext, useState, useEffect } from "react";
import{ v4 as uuid} from 'uuid'

export const AllContext = createContext()

export const AllProvider = ({ children }) => {

    const API = import.meta.env.VITE_BASE_URL
    const userLoggedIn = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');
    
    const [friends, setFriends] = useState([])
    const [pendingRequests, setPendingRequests ] = useState([])
    const [user, setUser] = useState({});
    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchUserProfile = (id) => {
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
    }

    useEffect(() => {
        fetch(`${API}/users/${userLoggedIn}/friends/`, {
            headers: { 'Authorization' : token }
        })
        .then( res => res.json() )
        .then( res => {
            setPendingRequests(res.filter( friend => friend.status === 'pending' && friend.id != userLoggedIn ).map(user => ({...user, uuid: uuid()}))) // In the database the friend.id is the user who sent the request so you should not be able to see the request you sent only the request sent to you
        })
        .catch( err => console.error( err ) )
    }, [user])


    return (
        <AllContext.Provider
            value={{
                friends,
                setFriends,
                pendingRequests,
                setPendingRequests,
                user, 
                setUser,
                fetchUserProfile,
                posts,
                setPosts,
                allPosts,
                setAllPosts
            }}
        >
            {children}
        </AllContext.Provider>
    );
}

export default AllProvider;