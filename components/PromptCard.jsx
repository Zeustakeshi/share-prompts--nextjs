"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { memo, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
// {
//     creatorID: "95726917";
//     creatorImage: "https://avatars.githubusercontent.com/u/95726917?v=4";
//     creatorName: "Zeustakeshi";
//     id: 6;
//     prompt: "hello world";
//     tag: "#hello";
// }
const PromptCard = ({
    data,
    handleClickItem = () => {},
    handleDelete = () => {},
    onClickTagname = () => {},
}) => {
    const [copied, setCopied] = useState("");
    const { data: session } = useSession();
    const pathname = usePathname();

    const handleCopy = () => {
        setCopied(data.prompt);
        navigator.clipboard.writeText(data.prompt);
        setTimeout(() => setCopied(""), 3000);
    };
    return (
        <div onClick={handleClickItem} className="relative prompt_card">
            <div
                onClick={handleCopy}
                className="copy_btn absolute top-2 right-2 flex justify-center items-center p-1"
            >
                <Image
                    src={`/assets/icons/${
                        copied === data.prompt ? "tick" : "copy"
                    }.svg`}
                    alt="copy"
                    width={20}
                    height={20}
                ></Image>
            </div>
            <div className="flex justify-start items-center gap-2">
                <Link
                    href={{
                        pathname:
                            data.creatorID === session?.user?.id
                                ? "/profile"
                                : `/profile/${data.creatorID}`,
                        query: { username: data.creatorName },
                    }}
                    className="w-[38px] h-[38px] rounded-full overflow-hidden"
                >
                    <img
                        src={data.creatorImage}
                        alt="creator-avatar"
                        className="w-full h-full object-contain"
                    />
                </Link>
                <div className="flex flex-col item-start justify-start ">
                    <h4 className="text-base font-semibold">
                        {data.creatorName}
                    </h4>
                    <h3
                        onClick={() => onClickTagname(data.tag)}
                        className="cursor-pointer text-sm text-gray-400 blue_gradient"
                    >
                        {data.tag}
                    </h3>
                </div>
            </div>
            <p className="p-2">{data.prompt}</p>
            {pathname === "/profile" &&
                session?.user?.id === data.creatorID && (
                    <div className="flex justify-end items-center gap-3 text-sm ">
                        <Link
                            href={`/edit-prompt?id=${data.id}`}
                            className="green_gradient"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(data.id)}
                            className="pink_gradient"
                        >
                            Delete
                        </button>
                    </div>
                )}
        </div>
    );
};

export default memo(PromptCard);
