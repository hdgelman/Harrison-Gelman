import { loginUser } from './api';
import { useState } from 'react';

export const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (event) => {
        event.preventDefault();

        const result = await loginUser(username, password)
        console.log(result)
        if (!result) {
            alert('Oops, incorrect username or password!')
            setUsername('')
            setPassword('')
            return;
        }
        alert('You are logged in!')
        setToken(result);
        setUsername('')
        setPassword('')
        localStorage.setItem('markymark', `${result}`);
    };

    const submitLogout = (event) => {
        event.preventDefault();
        setToken('')
        localStorage.removeItem('markymark');
    };

    return (
        <div className='login-container'>
            <form id='login-form'>
                <input required type="text" placeholder="Username " value={username} onChange={(event) => {
                    setUsername(event.target.value)
                }} />
                <input required minLength='8' type="password" placeholder="Password " value={password} onChange={(event) => {
                    setPassword(event.target.value)
                }} />
                <button onClick={(event) => submitLogin(event)}>Login</button>
                <button onClick={(event) => submitLogout(event)}>Logout</button>
            </form>
        </div>
    )
};