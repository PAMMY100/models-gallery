import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0
  },
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
        setTimeout(() => {
          alert('Item added to cart')
        }, 1000)
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
      if(localStorage.getItem('token')) {
        fetch('http://localhost:4000/addtocart',{
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'Items': state.items})
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
      }
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
    }
  }
})

export const cartActions = cartSlice.actions;

export default cartSlice