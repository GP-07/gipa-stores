import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
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
        <IconButton className={classes.cartIcon} color="inherit" aria-label="menu">
            <ShoppingCartIcon />
        </IconButton>
    )
}

export default CartWidget;