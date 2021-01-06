import { useHistory } from 'react-router-dom';
import ItemCountContainer from '../ItemCountContainer/ItemCountContainer';
import Button from '@material-ui/core/Button';
import './ItemDetail.css';

const ItemDetail = ({item}) => {
    const history = useHistory();

    const handleClickAddToCart = () => {
        history.push("/cart");
    }

    return (
        <article className="container">
            <h1>{item.title}</h1>
            <div className="siders">
                <img src={item.image} alt={item.title} />
                <div>
                    <h2 className="sider">{item.description}</h2>
                    <p className="sider">Colores disponibles: </p>
                    {
                        item.available_colours.map((available_colour, index) => (
                            <div key={index} className={`sider square ${available_colour}-background`} />
                        ))
                    }
                    <p className="sider">Precio: {item.currency}{item.price}</p>
                </div>
            </div>
            <br />
            <ItemCountContainer stock={item.stock} />
            <br />
            <Button variant="contained" color="primary" onClick={handleClickAddToCart}>
                Agregar a carrito
            </Button>
        </article>
    )
}

export default ItemDetail;