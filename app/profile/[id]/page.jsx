'use client'

import Profile from '@components/Profile';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


const UserProfile = ({params}) => {
    const [posts, setPosts] = useState([]);
    const userName = useSearchParams().get('name');



    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setPosts(data);
        };

        if (params?.id) fetchPosts();
    }, [params?.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
    )
}

export default UserProfile;