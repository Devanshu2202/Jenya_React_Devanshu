const LoginPage = () => {
    return (
        <>
            <h1 className="text-3xl font-bold underline">Login Page</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="border border-gray-300 rounded-md p-2" />
                <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Login</button>
            </form>
        </>
    )
}

export default LoginPage