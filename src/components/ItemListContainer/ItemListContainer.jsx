import { makeStyles } from '@material-ui/core/styles';
import bajomesadaimg from '../../assets/bajomesada.jpg';
import vanitoryimg from '../../assets/vanitory.jpg';
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';

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

    return (
        <>
            <div className={classes.catalogue}>
                <div className={classes.product}>
                    <img src={bajomesadaimg} alt="bajomesada" />
                    <ItemCountContainer stock={5} />
                </div>
                <div className={classes.product}>
                    <img src={vanitoryimg} alt="vanitory" />
                    <ItemCountContainer stock={5} />
                </div>
            </div>
        </>
    )
}

export default ItemListContainer;