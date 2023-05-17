import {
    deletePromptById,
    getPromptById,
    upDatePromptById,
} from "@/model/prompt.model";

export const GET = async (req, { params }) => {
    const { id } = params;
    try {
        const prompt = await getPromptById(id);
        if (!prompt)
            return new Response(JSON.stringify("Not found!"), { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    const { id } = params;
    const { tag, prompt } = await req.json();
    try {
        const newPrompt = await upDatePromptById(id, tag, prompt);
        if (!newPrompt)
            return new Response(JSON.stringify("not found"), { status: 404 });
        return new Response(JSON.stringify(newPrompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    const { id } = params;
    try {
        await deletePromptById(id);
        return new Response(JSON.stringify("Delete successful!"), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
