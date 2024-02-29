const cartReducer = (state = { id_user: '', listCart: [] }, action) => {
    switch (action.type) {
        case "ADD_CART": {

            const data = action.data;
            const list = state.listCart;
                const existingItemIndex = list.findIndex(existingItem => existingItem.id === data.id);

                if (existingItemIndex !== -1) {
                    const updatedProductItems = [...list];
                    updatedProductItems[existingItemIndex].quantity += 1;

                    return {
                        ...state,
                        listCart: updatedProductItems
                    };

                } else {
                    return {
                        ...state,
                        listCart: [...list, { ...data, quantity: 1 }]
                    };

                }
            

            localStorage.setItem('cartItems', JSON.stringify(state.listCart));
            return state;
        }
        case "DELETE_CART": {
            const list = state.listCart.slice();
            const indexDelete = list.findIndex(value => value._id === action.data);
            list.splice(indexDelete, 1);

            return {
                ...state,
                listCart: list
            };
        
        }


        case "DOWN_ITEM": {

            const data = action.data;
            const list = state.listCart;
                const existingItemIndex = list.findIndex(existingItem => existingItem.id === data.id);

                if (existingItemIndex !== -1) {
                    const updatedProductItems = [...list];
                    updatedProductItems[existingItemIndex].quantity -= 1;

                    return {
                        ...state,
                        listCart: updatedProductItems
                    };

                }
        
            return state;
        }
        


        case "UPDATE_CART": {
            const data = action.data;
            const list = state.listCart.map(item => {
                if (item.id_cart === data.id_cart) {
                    return { ...item, quantity: data.quantity };
                } else {
                    return item;
                }
            });

            return {
                ...state,
                listCart: list
            };
        }
        default: {
            return state;
        }
    }
};

export default cartReducer;
