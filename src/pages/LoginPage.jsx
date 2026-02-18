import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">Login Page</h1>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border border-gray-300 rounded-md p-2" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>

            <div>
                <p>demo creds username: 'emilys', password: 'emilyspass'</p>
            </div>

        </>
    )
}

export default LoginPage