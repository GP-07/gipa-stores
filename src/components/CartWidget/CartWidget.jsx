import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    cartIcon: {
        padding: theme.spacing(1, 2, 1, 2),
        fontSize: `2rem`
    }
}));

const CartWidget = () => {
    const classes = useStyles();
    return (
        <ShoppingCartIcon className={classes.cartIcon} />
    )
}

export default CartWidget;