import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: []
  },
  reducers: {
    addToCart(state,action){
      const {product:newproduct , quantity} = action.payload;
      const existingItem = state.value.find(({product})=>product.id===newproduct.id);
      if(existingItem){
        existingItem.quantity+=1;
      }
      else
      state.value.push(action.payload);
    },
    removeFromCart(state,action){
      const {product}=action.payload;
      const index = state.value.findIndex(({product:prod})=>prod.id===product.id);
      if(index>-1){
        const existingItem=state.value[index];
        if(existingItem.quantity===1){
          state.value.splice(index,1);
        }
        else{
          existingItem.quantity-=1;
        }
      }
    },
    clearCart(state){
      state.value =[];
    }
    
  }
})

export const { addToCart ,removeFromCart ,clearCart} = cartSlice.actions;

export default cartSlice.reducer


