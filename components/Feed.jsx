"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import Search from "./Search";
let cachePost = [];
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        (async () => {
            const res = await axios({
                method: "GET",
                url: "/api/prompts",
            });
            setPosts(res.data);
            cachePost = res.data;
        })();
    }, []);

    const handleSearch = async (searchValue) => {
        if (!searchValue.trim()) {
            setPosts(cachePost);
            return;
        }
        setSearching(true);
        try {
            const res = await axios({
                method: "GET",
                url: "/api/search",
                params: {
                    q: searchValue,
                },
            });
            setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
        setSearching(false);
    };

    const handelClickTagName = (tagName) => {
        setSearchValue(tagName);
    };

    return (
        <div className="flex flex-col w-full justify-start items-center">
            <Search
                handleSearch={handleSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            ></Search>
            <PromptCardList
                loading={searching}
                data={posts}
                handelClickTagName={handelClickTagName}
            ></PromptCardList>
        </div>
    );
};

export default Feed;
