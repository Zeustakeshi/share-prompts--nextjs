import pool from "@/utils/database";

export const newUser = async (id, username, email, image) => {
    await pool.query(
        "INSERT INTO users (id, username, email, image) VALUES ($1, $2, $3, $4)",
        [id, username, email, image]
    );
    return {
        id,
        username,
        email,
        image,
    };
};

export const findUserByEmail = async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    return rows[0];
};

export const findUserById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
    ]);
    return rows[0];
};

export const userExists = async (id) => {
    const { rows } = await pool.query("SELECT id FROM users WHERE id = $1", [
        id,
    ]);
    return rows[0];
};
