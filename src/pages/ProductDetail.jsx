import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Product Detail</h1>
      {/* TODO: logout button */}
      <button onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/login');
      }}>Logout</button>
    </div>
  )
}
export default ProductDetail