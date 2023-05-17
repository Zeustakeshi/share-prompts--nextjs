"use client";
import Profile from "@/components/Profile";
import axios from "axios";
import { useEffect, useState } from "react";
const OtherProfile = ({ params, searchParams }) => {
    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(false);
    const userId = params.id;
    const { username } = searchParams;

    useEffect(() => {
        if (!userId) return;
        (async () => {
            setFetching(true);
            const res = await axios({
                method: "GET",
                url: `/api/users/${userId}/prompts`,
            });
            setPosts(res.data);
            setFetching(false);
        })();
    }, []);

    return (
        <Profile
            loading={fetching}
            name={username}
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, itaque?"
            data={posts}
        />
    );
};

export default OtherProfile;
