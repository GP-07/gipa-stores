import { makeStyles } from '@material-ui/core/styles';
import Item from '../Item/Item';

const useStyles = makeStyles((theme) => ({
    product: {
        paddingRight: `2rem`
    }
}));

const ItemList = ({items}) => {
    const classes = useStyles();

    return (
        <>
            {
                items.map(item => (
                    <div key={item.id} className={classes.product}>
                        <Item item={item} />
                    </div>
                ))
            }
        </>
    )
}

export default ItemList;