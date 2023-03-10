const client = require('./client');
const { createUser } = require('./users');

const dropTables = async () => {
    try {
        console.log('Dropping all tables!');

        await client.query(`
        DROP TABLE IF EXISTS follows;
        DROP TABLE IF EXISTS songs_liked_users;
        DROP TABLE IF EXISTS songs;
        DROP TABLE IF EXISTS users;
        `);
    } catch (error) {
        console.log(`Error dropping tables: ${error}`);
    }
}

const createTables = async () => {
    try {
        console.log('Starting to build tables!');

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name TEXT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );

        CREATE TABLE songs (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            picture TEXT NOT NULL,
            description TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE songs_liked_users (
            uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
            song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE follows (
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            following_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            followed_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        `)

    } catch (error) {
        console.log(`Error creating tables: ${error}`);
    }
}

const createInitialUsers = async () => {
    try {
        console.log('Starting to create user...');

        const usersToCreate = [
            { name: 'bailey', username: 'bailey', password: 'lavinerocks' },
            { name: 'brad', username: 'brad', password: 'bruhbruh' }
        ]

        const users = await Promise.all(usersToCreate.map(createUser));

    } catch (error) {
        console.log(`Error creating users: ${error}`);
    }
}

const rebuildDB = async () => {
    try {
        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.log(`Error during rebuild: ${error}`);
    }
}

// const testDB = async () => {
//     console.log('Starting to test database...');
//     console.log('Finished testing!');
// }

module.exports = {
    rebuildDB,
    dropTables,
    createTables
};