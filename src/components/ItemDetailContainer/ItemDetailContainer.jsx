import { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { data } from '../../assets/data';

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);

    const getItem = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });

    useEffect(() => {
        getItem
            .then(response => setItem(response[0]))
            .catch(error => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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