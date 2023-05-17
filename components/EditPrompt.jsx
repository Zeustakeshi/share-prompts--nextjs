"use client";
import Form from "@/components/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submiting, setSubmiting] = useState(false);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await axios({
                method: "GET",
                url: `/api/prompts/${promptId}`,
            });
            const prompt = res.data;
            if (prompt.creatorID !== session?.user?.id) {
                router.replace("/");
            }
            setPost({
                prompt: prompt.prompt,
                tag: prompt.tag,
            });
        })();
    }, []);

    const handlUpdatePrompt = async () => {
        if (!session?.user?.id) return;
        if (!post.prompt.trim() || !post.tag.trim()) return;
        if (post.tag[0] != "#") post.tag = "#" + post.tag;
        setSubmiting(true);
        try {
            await axios({
                method: "PATCH",
                url: `/api/prompts/${promptId}`,
                data: {
                    prompt: post.prompt,
                    tag: post.tag.toLocaleLowerCase(),
                },
            });
            router.back();
        } catch (error) {
            console.log(error);
        }
        setSubmiting(false);
    };
    return (
        <Form
            type="Edit"
            post={post}
            submiting={submiting}
            setSubmiting={setSubmiting}
            setPost={setPost}
            handleSubmit={handlUpdatePrompt}
        ></Form>
    );
};

export default EditPrompt;
