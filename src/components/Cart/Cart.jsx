import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import { CartContext } from '../../store/CartContext';
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        // maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    totalQuantity: {
        fontWeight: "bold"
    },
    totalAmount: {
        fontWeight: "bold"
    },
    actions: {
        position: "absolute",
        top: `5rem`,
        right: `2rem`,
    }
}));

const Cart = () => {
    const classes = useStyles();

    // UseContext : carga la data del carrito desde el contexto y también permite modificarla
    const [data, isInCart, addItem, addToExisting, removeItem, clear] = useContext(CartContext);

    const getSubtotalPerItem = (item) => {
        return item.data.price * item.quantity;
    }

    const getTotal = () => {
        let total = 0;
        data.items.forEach(item =>
            total = total + getSubtotalPerItem(item)
        );
        return total;
    }

    const modifyItemQuantity = (item, newQuantity) => {
        let itemModified = {
            data: item.data,
            quantity: newQuantity
        };
        newQuantity > item.quantity ? addItem(itemModified) : removeItem(itemModified);
    }

    return (
        <>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button className={classes.actions} variant="contained" color="primary" onClick={() => clear()}>
                            Vaciar carrito
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        {
            data.items.map(item => {
                return (
                    <div key={item.data.id} className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={item.data.image} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                        {item.data.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                        {item.data.description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {`Cantidad de este producto: ${item.quantity}`}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                        {`Precio unitario: ${item.data.price}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <ItemCountContainer stock={item.data.stock} itemQuantity={item.quantity} 
                                        modifyItemQuantity={(newQuantity) => {
                                            modifyItemQuantity(item, newQuantity)
                                        }} />
                                    </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">{`Subtotal: ${getSubtotalPerItem(item)}`}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                )
            })
        }
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <p className={classes.totalQuantity}>{`Cantidad total de productos: ${data.totalQuantity}`}</p>
                    </Grid>
                    <Grid item>
                        <p className={classes.totalAmount}>{`Precio total: ${getTotal()}`}</p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        </>
    );
}

export default Cart;