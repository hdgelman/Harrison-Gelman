import { registerUser } from './api';
import { useState } from 'react';

export const Register = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConf = (event) => {
        setPasswordConf(event.target.value);
    };

    const submitRegister = async (event) => {
        event.preventDefault();

        const user = await registerUser(username, password);
        console.log(user)

        if (user) {
            alert(`${user.username} already exists!`)
        }

        if (password !== passwordConf) {
            alert('Incorrect password! Please try again.')
        }

        setUsername('');
        setPassword('');
        setPasswordConf('');
        localStorage.setItem('markymark', `${user}`);
        localStorage.setItem('username', username);
        alert('Registered successfully!');
    }

    return (
        <div className='register-container'>
            <form onSubmit={submitRegister} id='register-form'>
                <input required placeholder='Username' type='text' value={username} onChange={handleUsername} />
                <input required placeholder='Password' min={8} type='password' value={password} onChange={handlePassword} />
                <input required placeholder='Confirm Password' min={8} type='password' value={passwordConf} onChange={handlePasswordConf} />
                <button type='submit' onClick={(event) => submitRegister(event)}>Register</button>
            </form>
        </div>
    )
};