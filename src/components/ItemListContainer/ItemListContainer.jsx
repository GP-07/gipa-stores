import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ItemList from '../ItemList/ItemList';
import { getFirestore } from '../../db';

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
    const db = getFirestore();

    const getRandomProducts = (elementsQty) => {
        db.collection("products").get()
            .then(docs => mapDbProducts(docs, elementsQty))
            .catch(error => console.error("Ha ocurrido un error al leer los productos de la bd: ", error));
    }

    const getProductFromCategory = id => {
        db.collection("products").where("category_id", "==", id).get()
            .then(docs => mapDbProducts(docs, 0))
            .catch(error => console.error("Ha ocurrido un error al leer los productos de la bd: ", error));
    }

    const mapDbProducts = (docs, randomizeQty) => {
        let productsFromDb = [];
        docs.forEach(doc => productsFromDb.push({id: doc.id, data: doc.data()}));
        if (randomizeQty) {
            // Shuffle array
            const shuffled = productsFromDb.sort(() => 0.5 - Math.random());
            // Get sub-array of first n elements after shuffled
            setProductsToBeListed(shuffled.slice(0, randomizeQty));
        } else {
            setProductsToBeListed(productsFromDb);
        }
    }

    useEffect(() => {
        console.log(`Selected category ${id}`);
        if (id === undefined) {
            getRandomProducts(4);
        } else {
            getProductFromCategory(Number(id));
        }
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