import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const registerdata = {
            firstname,
            lastname,
            email,
            username,
            password,
            confirmPassword
        }
        console.log("registerdata", registerdata);

    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">Register Page</h1>
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <input type="text" className="border border-gray-300 rounded-md p-2" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                <input type="text" className="border border-gray-300 rounded-md p-2" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                <input type="email" className="border border-gray-300 rounded-md p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" className="border border-gray-300 rounded-md p-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" className="border border-gray-300 rounded-md p-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="password" className="border border-gray-300 rounded-md p-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Register</button>
            </form>
            <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </>
    )
}

export default RegisterPage