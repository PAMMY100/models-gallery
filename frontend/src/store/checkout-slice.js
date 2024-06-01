import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: { checkoutStatus: false},
  reducers: {
    openCheckout(state) {
      state.checkoutStatus = true
    },
    closeCheckout(state) {
      state.checkoutStatus = false
    }
  }
})

export const checkoutActions = checkoutSlice.actions

export default checkoutSlice