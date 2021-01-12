import ItemCount from '../ItemCount/ItemCount';

const ItemCountContainer = ({stock, itemQuantity, modifyItemQuantity}) => {

    const addItem = () => {
        modifyItemQuantity(itemQuantity + 1);
    }

    const removeItem = () => {
        modifyItemQuantity(itemQuantity - 1);
    }

    return (
        <ItemCount stock={stock} initial={itemQuantity} onAdd={addItem} onRemove={removeItem} />
    )
}

export default ItemCountContainer;