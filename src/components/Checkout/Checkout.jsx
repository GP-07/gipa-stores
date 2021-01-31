import { useState, useContext, useRef } from 'react';
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
    const nameInput = useRef(null);
    const surnameInput = useRef(null);
    const phoneInput = useRef(null);
    const emailAddressInput = useRef(null);
    const [errors, setErrors] = useState({
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
        if (isValidForm()) {
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
    }

    const handleBlur = e => {
        isValidForm();
    }

    const isValidForm = () => {
        let validationResult = true;

        const nameRegex = new RegExp(/^[a-zA-Z\s]{3,10}$/);
        const surnameRegex = new RegExp(/^[a-zA-Z\s]{3,10}$/);
        const phoneRegex = new RegExp(/(\+\d{1,2}\s\d{1,3}\s\d{4}\-\d{4})$/);
        const emailRegex = new RegExp(/^[a-zA-Z\s]{3,10}$/);

        let errorsDetected = { ...errors };

        if (!nameRegex.test(formData.name.trim())) {
            nameInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, name: 'El nombre debe contener entre 3 y 10 caracteres y solo admite minúsculas, mayúsculas y espacios'};
            validationResult = false;
        } else {
            errorsDetected = {...errorsDetected, name: ''};
            nameInput.current.style.border = "";
        }

        if (!surnameRegex.test(formData.surname.trim())) {
            surnameInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, surname: 'El apellido debe contener entre 3 y 10 caracteres y solo admite minúsculas, mayúsculas y espacios'};
            validationResult = false;
        } else {
            errorsDetected = {...errorsDetected, surname: ''};
            surnameInput.current.style.border = "";
        }

        if (!phoneRegex.test(formData.phone.trim())) {
            phoneInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, phone: 'El telefono debe tener la siguiente estructura: +54 011 4444-5555'};
            validationResult = false;
        } else {
            errorsDetected = {...errorsDetected, phone: ''};
            phoneInput.current.style.border = "";
        }

        if (!emailRegex.test(formData.email_address.trim())) {
            emailAddressInput.current.style.border = "1px solid red";
            validationResult = false;
        } else {
            emailAddressInput.current.style.border = "";
        }

        setErrors(errorsDetected);        
        return validationResult;
    }

    const handleClose = () => {
        setOpen(false);
        history.push("/");
    }

    return (
        <>
        {
            !completedSale ? (
            <form className="form" onSubmit={saveSale} onBlur={handleBlur}>
                <h1 className="formTitle">Complete sus datos para poder finalizar la compra!</h1>
                {
                    Object.entries(errors).filter(error => error[1] !== '').length && 
                    <ul>
                        {
                            Object.entries(errors).filter(error => error[1] !== '').map((error, index) => (
                                <li key={index} style={{color: 'red'}}><span>{error[1]}</span></li>
                            ))
                        }
                    </ul>
                }
                <div>
                    <input 
                        className="formInput" 
                        type="text" 
                        name="name" 
                        placeholder="Name"
                        ref={nameInput}
                        value={formData.name}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="formInput" 
                        type="text" 
                        name="surname" 
                        placeholder="Surname"
                        ref={surnameInput}
                        value={formData.surname}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="formInput" 
                        type="text" 
                        name="phone" 
                        placeholder="Phone number"
                        ref={phoneInput}
                        value={formData.phone}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="formInput" 
                        type="email" 
                        name="email_address" 
                        placeholder="Email address"
                        ref={emailAddressInput}
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