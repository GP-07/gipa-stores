import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getSelectedProduct } from '../../assets/data';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

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
            .then(response => setItem(response))
            .catch(error => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            {
                item ?
                <>
                    <ItemDetail item={item} />

                    <section>
                        Productos recomendados
                    </section>
                </> : 
                <p>Cargando producto...</p>
            }

        </>
    )
}

export default ItemDetailContainer;