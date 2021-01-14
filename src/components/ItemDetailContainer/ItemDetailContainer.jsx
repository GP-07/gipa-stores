import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ItemDetail from '../ItemDetail/ItemDetail';
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';
import { getSelectedProduct } from '../../assets/data';
import './ItemDetailContainer.css';
import { CartContext } from '../../store/CartContext';

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

    const getItem = (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id !== undefined) {
                    // The first element from array returned. There should be only one element.
                    resolve(getSelectedProduct(id)[0]);
                } else {
                    reject("Debe seleccionar un producto!");
                }
            }, 2000);
        });
    };

    useEffect(() => {
        console.log(`Selected product ${id}`);
        getItem(id)
            .then(response => setItem({
                data: response,
                quantity: 0
            }))
            .catch(error => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
                    <ItemCountContainer stock={item.data.stock} itemQuantity={item.quantity} modifyItemQuantity={modifyItemQuantity} />
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