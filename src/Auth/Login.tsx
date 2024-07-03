import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

export const Login = () => {

    const { login } = useAuthContext();

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsernameInput(savedUsername);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("username", usernameInput);
        login({ username: usernameInput, password: passwordInput });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
            />
            <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username"
            />

            <button type="submit">Login</button>
        </form>
    );
};