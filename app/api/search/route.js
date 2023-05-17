import { searchPromt } from "@/model/search.model";
import { nonAccentVietnamese } from "@/utils/nonAccentVietnamese";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");
    try {
        const res = await searchPromt(nonAccentVietnamese(query));
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
