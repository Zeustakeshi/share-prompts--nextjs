import pool from "@/utils/database";

export const searchPromt = async (searchValue) => {
    const { rows } = await pool.query(
        `
        SELECT 
        pm.prompt, pm.tag, pm.id,
        us.id AS "creatorID", us.username AS "creatorName", us.image AS "creatorImage" 
        FROM prompts pm
        JOIN users us ON us.id = pm.userid
        WHERE 
        LOWER(pm.tag) @@ $1 OR
        LOWER(us.username) @@ $1 OR 
        LOWER(pm.prompt) @@ $1
    `,
        [searchValue]
    );

    return rows;
};
