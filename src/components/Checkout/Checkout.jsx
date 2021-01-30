import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { CartContext } from '../../store/CartContext';
import "./Checkout.css";
import { getFirestore } from '../../db/index';
import CheckoutDialog from './CheckoutDialog';

const Checkout = () => {
    const {data, clear} = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '', 
        email_address: ''
    });
    const [completedSale, setCompletedSale] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const db = getFirestore();

    const handleChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const sale = {
        buyer: formData,
        items: data.items,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        total: data.items.reduce((total, item) => total + (item.data.price * item.quantity), 0) 
    }

    const saveSale = e => {
        e.preventDefault();
        db.collection("sales").add(sale)
            .then(({ id }) => {
                setCompletedSale(true);
                setOrderNumber(id);
                setOpen(true);
                clear();
            })
            .catch(error => {
                console.log("Ha ocurrido un error al grabar la venta: ", error);
            });
    }

    const handleClose = () => {
        setOpen(false);
        history.push("/");
    }

    return (
        <>
        {
            !completedSale ? (
            <form className="form" onSubmit={saveSale}>
                <h1 className="formTitle">Complete sus datos para poder finalizar la compra!</h1>
                <div>
                    <input 
                        className="formInput" 
                        type="text" 
                        name="name" 
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="formInput" 
                        type="text" 
                        name="surname" 
                        placeholder="Surname"
                        value={formData.surname}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="formInput" 
                        type="text" 
                        name="phone" 
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="formInput" 
                        type="text" 
                        name="email_address" 
                        placeholder="Email address"
                        value={formData.email_address}
                        onChange={handleChangeInput}
                    />
                </div>
                <button className="formButton" type="submit">Pagar</button>
            </form>) : 
            <CheckoutDialog orderNumber={orderNumber} open={open} handleClose={handleClose} />
        }
        </>
    )
}

export default Checkout;