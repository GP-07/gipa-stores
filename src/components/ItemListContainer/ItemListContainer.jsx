import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import bajomesadaimg from '../../assets/img/bajomesada.jpg';
import vanitoryimg from '../../assets/img/vanitory.jpg';
import ItemList from '../ItemList/ItemList';

const useStyles = makeStyles((theme) => ({
    catalogue: {
        display: `flex`,
        padding: `4rem 2rem`
    }
}));

const ItemListContainer = () => {
    const classes = useStyles();
    const [productsToBeListed, setProductsToBeListed] = useState([]);

    const products = [
        {
            id: 1, 
            title: "Mueble bajomesada",
            image: bajomesadaimg,
            stock: 5,
            price: 200
        },
        {
            id: 2, 
            title: "Vanitory para baño",
            image: vanitoryimg,
            stock: 5,
            price: 100
        }
    ];

    const getProducts = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });

    const loadProducts = async () => {
        try {
            const result = await getProducts;
            setProductsToBeListed(result);
        } catch(error) {
            alert("Hubo un error al cargar los productos del catalogo");
        }
    };

    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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