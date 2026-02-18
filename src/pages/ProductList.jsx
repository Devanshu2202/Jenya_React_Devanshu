import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCurrentPage, PRODUCTS_LIMIT } from "../features/products/productSlice";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, total, currentPage, loading, error } = useSelector((state) => state.products);

    const totalPages = Math.ceil(total / PRODUCTS_LIMIT);

    useEffect(() => {
        dispatch(fetchProducts(currentPage));
    }, [currentPage, dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Product List</h1>
                <p className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * PRODUCTS_LIMIT + 1}–{Math.min(currentPage * PRODUCTS_LIMIT, total)} of {total} products
                </p>
            </div>
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    ← Previous
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => dispatch(setCurrentPage(page))}
                            className={`px-3 py-1 text-sm font-medium rounded-md cursor-pointer ${page === currentPage
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default ProductList;