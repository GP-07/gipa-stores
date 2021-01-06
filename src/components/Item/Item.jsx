import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    linkableCard: {
      textDecoration: `none`,
    }
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
                    <br />
                    Precio: {item.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/item/${item.id}`} className={classes.linkableCard}>
                    <Button variant="contained" color="primary">
                        Ver más detalle
                    </Button>
                </Link>
            </CardActions>
        </Card>
    </>
    )
}

export default Item;