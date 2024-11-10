import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid'

// COMPONENTS
import Posts from './Posts';

const PostsContainer = ({allPosts, setAllPosts}) => {
    const API = import.meta.env.VITE_BASE_URL;
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [friends, setFriends] = useState([]);
    const [run, setRun] = useState(false)
 
    async function fetchPosts() {
        try {
            const friendsPost = await Promise.all(friends.map((friend) => fetch(`${API}/users/${friend.id == id ? friend.friend_id : friend.id}/posts`, {
                    headers: {
                        'Authorization': token 
                    }
                })
                .then(res => res.json())
                .then( res => { 
                    console.log(res)
                    return res
                })
            ));

            const friendsPosts = friendsPost.flat();

            const userPosts = await fetch(`${API}/users/${id}/posts`, {
                headers: {
                    'Authorization': token 
                }
            })
            .then(res => res.json());

            const allPostsCombined = [...friendsPosts, ...userPosts];
            const newPosts = allPostsCombined.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map( post => {
                return {...post, uuid: uuid()}
            })
            
            setAllPosts(newPosts);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetch(`${API}/users/${id}/friends`, {
            headers: { 
                'Authorization': token 
            }
        })
        .then(res => res.json())
        .then(res => {
            setFriends(res.filter( friend => friend.status == "accepted"));
        })
        .catch(err => console.error(err));
    }, [id, API, token]);

    useEffect(() => {
        if ( token ) {
            fetchPosts();
        }
    }, [friends, API, id, token]);

    useEffect(() => {
        fetchPosts()
    }, [run])

    return ( 
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {!allPosts.length ? 
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-lg">Post an accomplishment to get started or add a friend to gain more resources</p>
                </div>
            :
                <div className="space-y-6">  
                    {allPosts.map((post) => (
                        <div key={post.uuid} className="bg-white  rounded-lg overflow-hidden">
                            <Posts post={post} setAllPosts={setAllPosts} setRun={setRun} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default PostsContainer;