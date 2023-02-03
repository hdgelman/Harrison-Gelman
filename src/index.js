import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Login } from './components';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('markymark'));
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {
        if (localStorage.getItem('markymark') && !token) {
            setLogin(true);
            setToken(localStorage.getItem('markymark'));
            setUser(localStorage.getItem('markymark'));
        }
    }, [])

    return (
        <Login />
    )
}

const container = document.getElementById('app')
const root = createRoot(container);
root.render(
    <App />
);