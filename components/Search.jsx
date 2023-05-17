"use client";
import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

const Search = ({ handleSearch, searchValue, setSearchValue }) => {
    // const [searchValue, setSearchValue] = useState("");
    const debounce = useDebounce(searchValue, 400);

    useEffect(() => {
        handleSearch(searchValue);
    }, [debounce]);

    return (
        <form className="w-full flex justify-center">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="search_input sm:w-[80%]"
                placeholder="Search for a tag or username"
            />
        </form>
    );
};

export default Search;
