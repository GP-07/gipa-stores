import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const Item = ({item}) => {
    const classes = useStyles();

    return (
    <>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {item.title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {item.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {item.title}
                </Typography>
                <img src={item.image} alt={item.title} />
                <Typography variant="body2" component="p">
                    <p>Precio: {item.price}</p>
                </Typography>
            </CardContent>
            <CardActions>
                <ItemCountContainer stock={item.stock} />
            </CardActions>
        </Card>
    </>
    )
}

export default Item;