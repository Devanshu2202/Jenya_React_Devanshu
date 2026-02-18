import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Don't render header if user is not logged in
    if (!user) return null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                    Welcome, <span className="font-medium text-gray-800">{user.username}</span>
                </span>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header