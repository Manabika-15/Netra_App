import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

//The reducer reads the action and updates the state.
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.productId === item.productId)
            if(existItem) {
                existItem.qty += item.qty || 1
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        setCartQuantity: (state, action) => {
            const { productId, qty } = action.payload
            const item = state.cartItems.find((cartItem) => cartItem.productId === productId)

            if (item && qty > 0) {
                item.qty = qty
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload
            state.cartItems = state.cartItems.filter((x) => x.productId !== productId)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.removeItem('cartItems')
        }
    }
})


export const {addToCart, setCartQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer
