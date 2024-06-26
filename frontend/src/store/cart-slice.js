import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToDatabase, removeFromDatabase } from "../utils";


const initialState = {
  items: [],
  totalQuantity: 0,
  status: null,
}

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const response = await fetch("https://models-gallery-api.vercel.app/cart");
    const data = await response.json();
    return data
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id)
      state.totalQuantity++

      if(!existingItem) {
        state.items.push({
          id: newItem.id,
          img: newItem.img,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        })

        alert('Item added to cart')
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
      addToDatabase(state.items)
    },
    removeFromCart(state, action){
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id)
      state.totalQuantity--;

      if(existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
      removeFromDatabase(state.items)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.status = 'loading'
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed"
    })
  }
})

export const cartActions = cartSlice.actions;

export default cartSlice
