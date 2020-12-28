import bajomesada from './img/bajomesada.jpg';
import vanitory from './img/vanitory.jpg';
import mesacomedor from './img/mesacomedor.jpg';
import placard from './img/placard.jpg';
import barradesayunador from './img/barradesayunador.jpg';
import panelflotante from './img/panelflotantetv.jpg';
import camaconrespaldo from './img/camaconrespaldo.jpg';
import espejobaño from './img/espejobaño.jpg';
import alacena from './img/alacena.jpg';
import racktv from './img/racktv.jpg';
import mesadeluz from './img/mesadeluz.jpg';
import mampara from './img/mampara.jpg';

const data = [
    {
        "id": 1, 
        "title": "Mueble bajomesada",
        "description": "Mueble de cocina con varios compartimientos para guardar su vajilla",
        "image": bajomesada,
        "available_colours": ["black", "white"],
        "stock": 5,
        "currency": "$",
        "price": 200,
        "category_id": 1 
    },
    {
        "id": 2, 
        "title": "Mesa comedor",
        "description": "Mesa 1.60m patas de hierro y superficie en madera",
        "image": mesacomedor,
        "available_colours": ["brown", "white"],
        "stock": 7,
        "currency": "$",
        "price": 550,
        "category_id": 2 
    },
    {
        "id": 3, 
        "title": "Placard",
        "description": "Placard 2m hecho enteramente en madera con puertas deslizables",
        "image": placard,
        "available_colours": ["brown", "black"],
        "stock": 3,
        "currency": "$",
        "price": 179,
        "category_id": 3
    },
    {
        "id": 4, 
        "title": "Vanitory para baño",
        "description": "Mueble de baño para guardar toallas, productos de higiene personal, etc.",
        "image": vanitory,
        "available_colours": ["black", "blue"],
        "stock": 5,
        "currency": "$",
        "price": 100,
        "category_id": 4
    },
    {
        "id": 5, 
        "title": "Barra desayunador",
        "description": "Barra desayunar 1.20m patas de hierro y superficie en madera",
        "image": barradesayunador,
        "available_colours": ["brown", "white"],
        "stock": 10,
        "currency": "$",
        "price": 265,
        "category_id": 1 
    },
    {
        "id": 6, 
        "title": "Panel flotante",
        "description": "Panel flotante tv hasta 65' con repisas varias",
        "image": panelflotante,
        "available_colours": ["brown", "grey"],
        "stock": 10,
        "currency": "$",
        "price": 580,
        "category_id": 2
    },
    {
        "id": 7, 
        "title": "Cama con respaldo",
        "description": "Cama queen size enchapada paraiso con respaldo en capitone",
        "image": camaconrespaldo,
        "available_colours": ["brown", "white"],
        "stock": 3,
        "currency": "$",
        "price": 1000,
        "category_id": 3
    },
    {
        "id": 8, 
        "title": "Espejo para baño",
        "description": "Espejo redondo para baño 0.3m diametro con led",
        "image": espejobaño,
        "available_colours": [],
        "stock": 6,
        "currency": "$",
        "price": 775,
        "category_id": 4
    },
    {
        "id": 9, 
        "title": "Alacena",
        "description": "Alacena flotante para cocina 8 compartimientos en madera wengue",
        "image": alacena,
        "available_colours": ["brown"],
        "stock": 9,
        "currency": "$",
        "price": 335,
        "category_id": 1
    },
    {
        "id": 10, 
        "title": "Rack tv",
        "description": "Rack tv 1.60m en madera enchapada en paraiso y blanco",
        "image": racktv,
        "available_colours": ["brown", "white"],
        "stock": 1,
        "currency": "$",
        "price": 1210,
        "category_id": 2
    },
    {
        "id": 11, 
        "title": "Mesas de luz",
        "description": "2 mesas de luz para combinar con cama blanca o cama color madera",
        "image": mesadeluz,
        "available_colours": ["brown", "white"],
        "stock": 15,
        "currency": "$",
        "price": 280,
        "category_id": 3
    },
    {
        "id": 12, 
        "title": "Mampara",
        "description": "Mampara de 2 paños de vidrio templado con puerta deslizable para ducha",
        "image": mampara,
        "available_colours": [],
        "stock": 20,
        "currency": "$",
        "price": 820,
        "category_id": 4
    }
];

const getRandomProducts = (elementsQty) => {
    // Shuffle array
    const shuffled = data.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, elementsQty);
}

const getProductFromCategory = (categoryId) => {
    return data.filter(product => product.category_id === Number(categoryId));
}

const getSelectedProduct = (productId) => {
    return data.filter(product => product.id === Number(productId));
}

export { data, getRandomProducts, getProductFromCategory, getSelectedProduct };