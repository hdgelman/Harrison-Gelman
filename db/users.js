const client = require('./client');
const bcrypt = require('bcrypt');

const createUser = async ({ username, password }) => {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, hashedPassword]);

        delete user.password;

        return user;
    } catch (error) {
        throw error;
    }
};

const getUser = async ({ username, password }) => {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username=$1;
        `, [username]);

        if (user && await bcrypt.compare(password, user.password)) {
            delete user.password;
            return user;
        }
    } catch (error) {
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username=$1;
        `, [username]);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (user_id) => {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username FROM users
        WHERE id=$1;
        `, [user_id]);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
};