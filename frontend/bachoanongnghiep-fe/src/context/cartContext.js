import React, { useContext, useState } from 'react';


const CartContext = React.createContext({
    id: '',
    id_category: '',
    product_name: '',
    product_price: '',
    images: '',
    quantity: '0',
});

const CartProvider = ({ children }) => {
    const [productItem, setProductItem] = useState([]);

    const addToCart = (item) => {

        const existingItemIndex = productItem.findIndex((existingItem) => existingItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedProductItems = [...productItem];
            updatedProductItems[existingItemIndex].quantity += 1;
            setProductItem(updatedProductItems);
        } else {

            setProductItem((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
        }
    }
    const deleteItem = (data) => {
        const itemDel = productItem.findIndex((item) => item.id = data.id)

        if (productItem[itemDel].quantity < 0) {
            productItem.filter((item) => item.id !== productItem[itemDel].id)
        } else {
            productItem[itemDel].quantity -= 1;


        }



    }

    const handleAddToCart = (id, id_category, product_name, product_price, images, quantity) => {
        if (quantity) {
            const newItem = {
                id: id,
                id_category: id_category,
                product_name: product_name,
                product_price: product_price,
                images: images,
                quantity: quantity,
            };


        }
        else {
            const newItem = {
                id: id,
                id_category: id_category,
                product_name: product_name,
                product_price: product_price,
                images: images,

            };

            addToCart(newItem);
            console.log(productItem)

        }
    };
    const getCartItem = () => { return productItem }

    return (
        <CartContext.Provider value={{ productItem, handleAddToCart,deleteItem }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };
