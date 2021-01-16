import { useState, useContext } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CartContext } from '../../store/CartContext';

const useStyles = makeStyles((theme) => ({
    cartIcon: {
        padding: theme.spacing(`0.25rem`, 2, 1, 2),
        fontSize: `2rem`
    },
    cartCounter: {
        paddingLeft: `0.5rem`,
        paddingBottom: `1.25rem`,
        fontSize: `0.75rem`
    },
    sider: {
        height: `100%`, /* Full-height: remove this if you want "auto" height */
        width: `300px`, /* Set the width of the sidebar */
        position: "fixed", /* Fixed Sidebar (stay in place on scroll) */
        zIndex: 1, /* Stay on top */
        top: `4.5rem`, /* Below the navbar */
        right: `0.5rem`, /* Below the cart icon (i.e., on the right) */
        backgroundColor: theme.palette.primary.main, /* Same color than the navbar */
        overflowX: "hidden", /* Disable horizontal scroll */
        paddingTop: `20px`
    },
    showSider: {
        display: "block"
    },
    hideSider: {
        display: "none"
    }
}));

const CartWidget = () => {
    const classes = useStyles();

    // UseContext : carga la data del carrito desde el contexto y también permite modificarla
    const [data] = useContext(CartContext);

    const [openCart, setOpenCart] = useState(false);

    const handleCartClick = () => {
        setOpenCart(!openCart);
    }

    return (
        <>
            {
                !!data.totalQuantity &&
                <>
                    <IconButton className={classes.cartIcon} onClick={handleCartClick} color="inherit" aria-label="menu">
                        <ShoppingCartIcon />
                        <span className={classes.cartCounter}>{data.totalQuantity}</span>
                    </IconButton>
                    <div className={`${classes.sider} ${openCart ? classes.showSider : classes.hideSider}`}>
                        <p>Productos del carrito</p>
                    </div>
                </>
            }
        </>
    )
}

export default CartWidget;