import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ItemList from '../ItemList/ItemList';
import { getRandomProducts, getProductFromCategory } from '../../assets/data';

const useStyles = makeStyles((theme) => ({
    catalogue: {
        display: `flex`,
        padding: `4rem 2rem`
    }
}));

const ItemListContainer = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [productsToBeListed, setProductsToBeListed] = useState([]);

    const getProducts = (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id === undefined) {
                    resolve(getRandomProducts(4));
                } else {
                    resolve(getProductFromCategory(id));
                }
            }, 2000);
        });
    };

    const loadProducts = async (id) => {
        try {
            const result = await getProducts(id);
            setProductsToBeListed(result);
        } catch(error) {
            alert("Hubo un error al cargar los productos del catalogo");
        }
    };

    useEffect(() => {
        console.log(`Selected category ${id}`);
        loadProducts(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            {
                productsToBeListed.length ?
                <div className={classes.catalogue}>
                    <ItemList items={productsToBeListed} />
                </div> :
                <h2>Cargando los productos destacados...</h2>
            }
        </>
    );
}

export default ItemListContainer;