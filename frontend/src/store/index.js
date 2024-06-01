import { configureStore } from "@reduxjs/toolkit";

import checkoutSlice from "./checkout-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
reducer: { checkout: checkoutSlice.reducer, cart: cartSlice.reducer }
})

export default store