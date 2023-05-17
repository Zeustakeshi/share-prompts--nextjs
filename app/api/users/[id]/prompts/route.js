import { getPromptsByUserId } from "@/model/prompt.model";

export const GET = async (req, { params }) => {
    const { id } = params;
    try {
        const prompts = await getPromptsByUserId(id);
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
