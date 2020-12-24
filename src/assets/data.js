import bajomesada from './img/bajomesada.jpg';
import vanitory from './img/vanitory.jpg';

const data = [
    {
        "id": 1, 
        "title": "Mueble bajomesada",
        "description": "Mueble de cocina con varios compartimientos para guardar su vajilla",
        "image": bajomesada,
        "available_colours": ["black", "white"],
        "stock": 5,
        "currency": "$",
        "price": 200
    },
    {
        "id": 2, 
        "title": "Vanitory para baño",
        "description": "Mueble de baño para guardar toallas, productos de higiene personal, etc.",
        "image": vanitory,
        "available_colours": ["black", "blue"],
        "stock": 5,
        "currency": "$",
        "price": 100
    }
];

export { data };