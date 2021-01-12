import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [data, setData] = useState({
        items: [],
        totalQuantity: 0
    });

    const isInCart = (searchItemId) => {
        return data.items.find(item => item.data.id === searchItemId);
    }
    
    const addItem = (item) => {
        if (!isInCart(item.data.id)) {
            setData({
                items: [...data.items, item],
                totalQuantity: data.totalQuantity + item.quantity
            });
        }
    }
    
    const removeItem = (itemIdToBeRemoved) => {
        if (!!isInCart(itemIdToBeRemoved)) {
            setData({
                items: data.items.filter(item => item.data.id !== isInCart.data.id),
                totalQuantity: data.totalQuantity - isInCart.quantity
            });
        }
    }
    
    const clear = () => {
        setData({
            items: [],
            totalQuantity: 0
        });
    }

    return (
        <CartContext.Provider value={[data, isInCart, addItem, removeItem, clear]}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;