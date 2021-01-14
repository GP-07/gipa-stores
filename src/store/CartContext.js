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
        } else {
            modifyItem(item);
        }
    }

    const addToExisting = (itemToModify) => {
        let elementToBeModify = data.items.findIndex(item => item.data.id === itemToModify.data.id)

        if (elementToBeModify > -1) {
            data.items[elementToBeModify].quantity = data.items[elementToBeModify].quantity + itemToModify.quantity;
            setData({
                items: data.items,
                totalQuantity: data.totalQuantity + itemToModify.quantity
            });
        }
    }
    
    const removeItem = (item) => {
        let elementToBeRemoved = isInCart(item.data.id);

        if (!!elementToBeRemoved) {
            if (item.quantity === 0) {
                setData({
                    items: data.items.filter(item => item.data.id !== elementToBeRemoved.data.id),
                    totalQuantity: data.totalQuantity - elementToBeRemoved.quantity
                });
            } else {
                modifyItem(item);
            }
        }
    }

    const modifyItem = (itemToModify) => {
        let elementToBeModify = data.items.findIndex(item => item.data.id === itemToModify.data.id)

        if (elementToBeModify > -1) {
            const previousQuantity = data.items[elementToBeModify].quantity;
            data.items[elementToBeModify].quantity = itemToModify.quantity;
            setData({
                items: data.items,
                totalQuantity: data.totalQuantity - previousQuantity + itemToModify.quantity
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
        <CartContext.Provider value={[data, isInCart, addItem, addToExisting, removeItem, clear]}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;