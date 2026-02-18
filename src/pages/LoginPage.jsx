import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
     useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
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

            if (!response.ok) {
                setError(data.message || 'Invalid credentials. Please try again.');
                return;
            }

            const { accessToken, refreshToken, ...userData } = data;
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(data);
            navigate('/dashboard');
        } catch (error) {
            setError('Network error. Please check your connection and try again.');
            console.log(error);
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">Login Page</h1>
            {error && <p className="text-red-500 font-medium">{error}</p>}
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