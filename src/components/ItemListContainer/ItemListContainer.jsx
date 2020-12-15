import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import bajomesadaimg from '../../assets/bajomesada.jpg';
import vanitoryimg from '../../assets/vanitory.jpg';
import ItemCount from '../ItemCount/ItemCount';

const useStyles = makeStyles((theme) => ({
    catalogue: {
        display: `flex`,
        padding: `4rem 2rem`
    },
    product: {
        paddingRight: `2rem`
    }
}));

const ItemListContainer = () => {
    const classes = useStyles();
    const [itemQuantity, setItemQuantity] = useState(0);

    const addItem = () => {
        setItemQuantity(itemQuantity + 1);
    }

    const removeItem = () => {
        setItemQuantity(itemQuantity - 1);
    }

    return (
        <>
            <div className={classes.catalogue}>
                <div className={classes.product}>
                    <img src={bajomesadaimg} alt="bajomesada" />
                    <ItemCount stock={5} initial={itemQuantity} onAdd={addItem} onRemove={removeItem} />
                </div>
                <div className={classes.product}>
                    <img src={vanitoryimg} alt="vanitory" />
                    <ItemCount stock={5} initial={itemQuantity} onAdd={addItem} onRemove={removeItem} />
                </div>
            </div>
        </>
    )
}

export default ItemListContainer;