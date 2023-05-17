"use client";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const Nav = () => {
    const [provider, setProvider] = useState();
    const { data: session } = useSession();

    useEffect(() => {
        (async () => {
            const response = await getProviders();
            setProvider(response);
        })();
    }, []);

    return (
        <nav className="flex justify-between item-center mb-4 pt-4 w-full">
            <Link href="/" className="flex-center gap-3">
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    className="object-contain"
                    alt="logo"
                ></Image>
                <p className="logo_text">Share Prompts</p>
            </Link>
            <div className="hidden sm:flex ">
                {session?.user ? (
                    <div className="flex justify-center items-center gap-3">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link
                            href="/profile"
                            className="rounded-full w-[50px] h-[50px] overflow-hidden"
                        >
                            <img
                                src={session.user.image}
                                alt="avatar"
                                className="object-contain w-full h-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {provider && (
                            <div className="flex items-center gap-3">
                                <button
                                    key={provider.name}
                                    className="black_btn"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <NavMenu isUserLogin={session?.user} provider={provider}></NavMenu>
        </nav>
    );
};

const NavMenu = ({ isUserLogin, provider }) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className=" sm:hidden inline-block">
            <div
                onClick={() => setShowMenu(true)}
                className="border p-2 rounded-lg cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </div>
            {showMenu && (
                <div className="fixed z-40 top-0 right-0 w-screen h-screen  shadow-sm">
                    <div
                        onClick={() => setShowMenu(false)}
                        className="absolute w-full h-full bg-black bg-opacity-20"
                    ></div>
                    <div className="absolute top-0 right-0 h-full bg-white w-[80%]">
                        <div className="flex flex-start p-2">
                            <div
                                onClick={() => setShowMenu(false)}
                                className="cursor-pointer inline-block p-3  rounded-lg hover:bg-gray-100 text-gray-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="p-3 w-full">
                            <div className="w-full flex flex-col justify-start items-center gap-y-4">
                                {isUserLogin ? (
                                    <>
                                        <Link
                                            href="/create-prompt"
                                            className="w-full py-2 text-center"
                                        >
                                            Create Post
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="w-full py-2 text-center"
                                        >
                                            My profile
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="black_btn w-full px-3 py-2 mt-10"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            key={provider.name}
                                            className="black_btn"
                                            onClick={() => signIn(provider.id)}
                                        >
                                            Login
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
