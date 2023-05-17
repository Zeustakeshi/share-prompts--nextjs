"use client";
import Profile from "@/components/Profile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!session?.user?.id) return;
        (async () => {
            setFetching(true);
            const res = await axios({
                method: "GET",
                url: `/api/users/${session?.user?.id}/prompts`,
            });
            setPosts(res.data);
            setFetching(false);
        })();
    }, []);

    const handleDelete = async (id) => {
        const ok = confirm("Are you sure you want to delete this prompt?");
        if (!ok) return;
        try {
            await axios({
                method: "DELETE",
                url: `/api/prompts/${id}`,
            });
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Profile
            loading={fetching}
            name="My"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, itaque?"
            data={posts}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
