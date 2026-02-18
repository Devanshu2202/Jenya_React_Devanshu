import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const LIMIT = 10;

// Async thunk for fetching products with pagination
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page, { rejectWithValue }) => {
        try {
            const skip = (page - 1) * LIMIT;
            const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
            const data = await res.json();
            return data;
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return rejectWithValue('Failed to fetch products.');
        }
    }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            return data; // returns the deleted product with isDeleted: true
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return rejectWithValue('Failed to delete product.');
        }
    }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const data = await res.json();
            return data;
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return rejectWithValue('Failed to update product.');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        total: 0,
        currentPage: 1,
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload.id);
                state.total -= 1;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = { ...state.products[index], ...action.payload };
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setCurrentPage } = productSlice.actions;
export const PRODUCTS_LIMIT = LIMIT;
export default productSlice.reducer;