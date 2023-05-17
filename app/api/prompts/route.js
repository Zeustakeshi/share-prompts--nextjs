import { getPrompts } from "@/model/prompt.model";

export const GET = async (req) => {
    try {
        const prompts = await getPrompts();
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
