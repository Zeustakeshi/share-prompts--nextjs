import { newPrompt } from "@/model/prompt.model";

export const POST = async (req) => {
    const { prompt, tag, userId } = await req.json();
    try {
        const newData = await newPrompt(prompt, tag, userId);
        return new Response(JSON.stringify(newData), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
