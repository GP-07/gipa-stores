import { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';

const ItemCountContainer = ({stock}) => {
    const [itemQuantity, setItemQuantity] = useState(0);

    const addItem = () => {
        setItemQuantity(itemQuantity + 1);
    }

    const removeItem = () => {
        setItemQuantity(itemQuantity - 1);
    }

    return (
        <ItemCount stock={stock} initial={itemQuantity} onAdd={addItem} onRemove={removeItem} />
    )
}

export default ItemCountContainer;