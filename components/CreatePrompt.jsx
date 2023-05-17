"use client";
import Form from "@/components/Form";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submiting, setSubmiting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleCreatePrompt = async () => {
        if (!session?.user?.id) return;
        if (!post.prompt.trim() || !post.tag.trim()) return;
        if (post.tag[0] != "#") post.tag = "#" + post.tag;
        setSubmiting(true);
        try {
            await axios({
                method: "POST",
                url: "/api/prompts/new",
                data: {
                    prompt: post.prompt,
                    tag: post.tag.toLocaleLowerCase(),
                    userId: session.user.id,
                },
            });
            router.replace("/");
        } catch (error) {
            console.log(error);
        }
        setSubmiting(false);
    };
    return (
        <Form
            type="Create"
            post={post}
            submiting={submiting}
            setSubmiting={setSubmiting}
            setPost={setPost}
            handleSubmit={handleCreatePrompt}
        ></Form>
    );
};

export default CreatePrompt;
