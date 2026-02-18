import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://dummyjson.com/products');
                const data = await res.json();
                setProducts(data.products);
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            <th className="border p-3">ID</th>
                            <th className="border p-3">Thumbnail</th>
                            <th className="border p-3">Title</th>
                            <th className="border p-3">Brand</th>
                            <th className="border p-3">Category</th>
                            <th className="border p-3">Price</th>
                            <th className="border p-3">Stock</th>
                            <th className="border p-3">Rating</th>
                            <th className="border p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 text-sm text-gray-700">
                                <td className="border p-3">{product.id}</td>
                                <td className="border p-3">
                                    <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="border p-3 font-medium">
                                    <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
                                        {product.title}
                                    </Link>
                                </td>
                                <td className="border p-3">{product.brand || '-'}</td>
                                <td className="border p-3 capitalize">{product.category}</td>
                                <td className="border p-3 font-semibold">${product.price.toFixed(2)}</td>
                                <td className="border p-3">{product.stock}</td>
                                <td className="border p-3">
                                    <span className="text-yellow-500">{'★'.repeat(Math.round(product.rating))}</span>
                                    <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                                    <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
                                </td>
                                <td className="border p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.availabilityStatus === 'In Stock'
                                        ? 'bg-green-100 text-green-700'
                                        : product.availabilityStatus === 'Low Stock'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.availabilityStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;