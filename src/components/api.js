const BASE_URL = 'http://localhost:3000/api'

export const loginUser = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const results = await response.json();
        return results.token;

    } catch (error) {
        console.log(error);
    }
};

export const registerUser = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const results = await response.json();
        return results.token;

    } catch (error) {
        console.log(error);
    }
};