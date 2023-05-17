import pool from "@/utils/database";

export const newPrompt = async (prompt, tag, userID) => {
    const { rows } = await pool.query(
        `INSERT INTO prompts ( prompt, tag, userid) 
        VALUES ($1, $2, $3) RETURNING *`,
        [prompt, tag, userID]
    );
    return rows[0];
};

export const getPrompts = async () => {
    const { rows } = await pool.query(`
        SELECT 
        pm.prompt, pm.tag, pm.id,
        us.id AS "creatorID", us.username AS "creatorName", us.image AS "creatorImage" 
        FROM prompts pm
        JOIN users us ON us.id = pm.userid
        ORDER BY id DESC
        LIMIT 6
    `);
    return rows;
};

export const getPromptsByUserId = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT 
        pm.prompt, pm.tag, pm.id,
        us.id AS "creatorID", us.username AS "creatorName", us.image AS "creatorImage" 
        FROM prompts pm
        JOIN users us ON us.id = pm.userid
        WHERE us.id = $1
    `,
        [userId]
    );
    return rows;
};

export const getPromptById = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT 
        pm.prompt, pm.tag, pm.id,
        us.id AS "creatorID", us.username AS "creatorName", us.image AS "creatorImage" 
        FROM prompts pm
        JOIN users us ON us.id = pm.userid
        WHERE pm.id = $1
    `,
        [id]
    );
    return rows[0];
};

export const upDatePromptById = async (id, tag, prompt) => {
    const { rows } = await pool.query(
        "UPDATE prompts SET tag = $1, prompt = $2 WHERE id = $3 RETURNING *",
        [tag, prompt, id]
    );
    return rows[0];
};

export const deletePromptById = async (id) => {
    await pool.query("DELETE FROM prompts WHERE id = $1", [id]);
};
