import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ItemDetail from '../ItemDetail/ItemDetail';
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';
import './ItemDetailContainer.css';
import { CartContext } from '../../store/CartContext';
import { getFirestore } from '../../db';

const ItemDetailContainer = () => {
    // UseParams : recibe el id del producto a mostrar por parametro
    const { id } = useParams();

    // UseState : se cargo en un estado local el item a mostrar y la cantidad que le va seteando el usuario
    const [item, setItem] = useState({
        data: null,
        quantity: 0
    });

    // UseHistory : para permitir la redirección al carrito cuando el usuario presione comprar
    const history = useHistory();

    // UseContext : luego de que presione comprar también debera ir completandose el carrito
    const [data, isInCart, addItem, addToExisting, removeItem, clear] = useContext(CartContext);

    // Configuración de la db para hacer las llamadas necesarias
    const db = getFirestore();

    const getItem = (id) => {
        db.collection("products").doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    setItem({
                        data: doc.data(),
                        quantity: 0
                    });
                }
            })
            .catch(error => console.error("Debe seleccionar un producto! Detalle: ", error));
    };

    useEffect(() => {
        console.log(`Selected product ${id}`);
        getItem(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const calculateCurrentStock = () => {
        const existingItemInCart = isInCart(item.data.id);
        if (!!existingItemInCart) {
            return item.data.stock - existingItemInCart.quantity;
        }
        return item.data.stock;
    }

    const modifyItemQuantity = (newQuantity) => {
        setItem({
            data: item.data,
            quantity: newQuantity
        });
    }

    const handleClickAddToCart = () => {
        if (!!isInCart(item.data.id)) {
            addToExisting(item);
        } else {
            addItem(item);
        }
        history.push("/cart");
    }

    return (
        <>
            {
                item.data ?
                <section className="itemContainer">
                    <ItemDetail item={item.data} />
                    <ItemCountContainer stock={calculateCurrentStock()} itemQuantity={item.quantity} modifyItemQuantity={modifyItemQuantity} />
                    <Button variant="contained" color="primary" onClick={handleClickAddToCart}>
                        Agregar a carrito
                    </Button>
                    <div className="relatedProducts">Productos recomendados</div>
                </section> : 
                <p>Cargando producto...</p>
            }

        </>
    )
}

export default ItemDetailContainer;