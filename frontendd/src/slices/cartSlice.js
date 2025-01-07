import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state,
                loading: true
            };
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
            const isItemExist = state.items.find(i => i.product === item.product);

            if (isItemExist) {
                // Update quantity if the item already exists
                state.items = state.items.map(i => {
                    if (i.product === item.product) {
                        return { ...i, quantity: i.quantity + item.quantity }; // Assuming item has a quantity property
                    }
                    return i;
                });
            } else {
                // Add new item
                state.items.push(item);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
            return {
                ...state,
                loading: false
            };
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product === action.payload) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }; // Prevent quantity from going below 1
                    }
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => item.product !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            return {
                ...state,
                items: filterItems
            };
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            };
        },
        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return {
                items: [],
                loading: false,
                shippingInfo: {}
            };
        },
        // New action to add an item to the cart
        addCartItem(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.product === item.product);

            if (existingItem) {
                existingItem.quantity += item.quantity; // Update quantity if exists
            } else {
                state.items.push(item); // Add new item
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update local storage
        }
    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest, 
    addCartItemSuccess,
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted,
    addCartItem // Export the new action
} = actions;

export default reducer;
