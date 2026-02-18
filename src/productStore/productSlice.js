import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const LIMIT = 10;

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
            });
    },
});

export const { setCurrentPage } = productSlice.actions;
export const PRODUCTS_LIMIT = LIMIT;
export default productSlice.reducer;