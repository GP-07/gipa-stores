import './ItemDetail.css';

const ItemDetail = ({item}) => (
    <article className="container">
        <h1>{item.title}</h1>
        <div className="siders">
            <img src={item.image} alt={item.title} />
            <div>
                <h2 className="sider">{item.description}</h2>
                {
                    item.available_colours.length ? 
                    <p className="sider">Colores disponibles: </p> :
                    <p className="sider">El color que se ve en la imagen es el único disponible!</p>
                }
                {
                    item.available_colours.map((available_colour, index) => (
                        <div key={index} className={`square ${available_colour}-background`} />
                    ))
                }
                <p className="sider">Precio: {item.currency}{item.price}</p>
            </div>
        </div>
    </article>
)

export default ItemDetail;