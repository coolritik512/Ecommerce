import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const  fetchAllProducts = createAsyncThunk('products/fetchAll',async()=>{

    return await fetch('https://fakestoreapi.com/products')
        .then(res => res.json());
})


const productSlice = createSlice({
    name:'products',
    initialState:{
        value:[],
        loading:false
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.value =action.payload;
            state.loading = false;
        })
    }
})


export default productSlice.reducer;
