import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CartContext } from '../../store/CartContext';

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
}));

const Cart = () => {
    const classes = useStyles();
    const [data] = useContext(CartContext);

    const getSubtotalPerItem = (item) => {
        return item.data.price * item.quantity;
    }

    return (
        <>
        {
            data.items.map(item => (
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
                                Otra info
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                Remove
                                </Typography>
                            </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{`Precio unitario: ${item.data.price}`}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{`Subtotal: ${getSubtotalPerItem(item)}`}</Typography>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                </div>
            ))
        }
        <p>{data.totalQuantity}</p>
        </>
    );
}

export default Cart;