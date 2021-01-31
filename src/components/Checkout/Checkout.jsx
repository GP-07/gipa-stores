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
        } else {
            alert("El formulario contiene algún campo invalido. Por favor, revisar!");
        }
    }

    const handleBlur = e => {
        isValidForm();
    }

    const isValidForm = () => {
        let validationResult = true;

        const nameRegex = new RegExp(/^\b([a-zÀ-ÿ][-,a-z. ']+[ ]*)+/i);
        const surnameRegex = new RegExp(/^\b([a-zÀ-ÿ][-,a-z. ']+[ ]*)+/i);
        const phoneRegex = new RegExp(/^(\+\d{1,2}\s\d{1,3}\s\d{4}\-\d{4})$/);
        // Regex used in type="email" from W3C:
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        let errorsDetected = { ...errors };

        if (!nameRegex.test(formData.name.trim())) {
            nameInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, name: 'Por favor, ingrese un nombre valido. Se aceptan minúsculas, mayúsculas, espacios, guiones medio, comas, puntos y algunos ciertos caracteres especiales'};
        } else {
            nameInput.current.style.border = "";
            errorsDetected = {...errorsDetected, name: ''};
        }

        if (!surnameRegex.test(formData.surname.trim())) {
            surnameInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, surname: 'Por favor, ingrese un apellido valido. Se aceptan minúsculas, mayúsculas, espacios, guiones medio, comas, puntos y algunos ciertos caracteres especiales'};
        } else {
            surnameInput.current.style.border = "";
            errorsDetected = {...errorsDetected, surname: ''};
        }

        if (!phoneRegex.test(formData.phone.trim())) {
            phoneInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, phone: 'Por favor, ingrese un número de teléfono valido. Para ser valido debe responder a la siguiente estructura: +54 011 4444-5555'};
        } else {
            phoneInput.current.style.border = "";
            errorsDetected = {...errorsDetected, phone: ''};
        }

        if (!emailRegex.test(formData.email_address.trim())) {
            emailAddressInput.current.style.border = "1px solid red";
            errorsDetected = {...errorsDetected, email_address: 'Por favor, ingrese una dirección de mail valida: nombre@dominio.com'};
        } else {
            emailAddressInput.current.style.border = "";
            errorsDetected = {...errorsDetected, email_address: ''};
        }

        if (![errorsDetected.name, errorsDetected.surname, errorsDetected.phone, errorsDetected.email_address].includes('')) {
            validationResult = false;
        }

        setErrors(errorsDetected);
        return validationResult;
    }

    const handleClose = () => {
        setOpen(false);
        history.push("/");
    }

    const getCurrentErrors = () => {
        return Object.entries(errors).filter(error => error[1] !== '');
    }

    const disableSaveButton = () => {
        return !!getCurrentErrors().length || 
        // Below configuration describes the initial state of the component when it is mounted
        (formData.name === '' && formData.surname === '' && formData.phone === '' && formData.email_address === '');
    }

    return (
        <>
        {
            !completedSale ? (
            <form className="form" onSubmit={saveSale} onBlur={handleBlur}>
                <h1 className="formTitle">Complete sus datos para poder finalizar la compra!</h1>
                {
                    !!getCurrentErrors().length && 
                    <ul>
                        {
                            getCurrentErrors().map((error, index) => (
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
                        type="text" 
                        name="email_address" 
                        placeholder="Email address"
                        ref={emailAddressInput}
                        value={formData.email_address}
                        onChange={handleChangeInput}
                    />
                </div>
                <button className="formButton" type="submit" disabled={disableSaveButton()}>Pagar</button>
            </form>) : 
            <CheckoutDialog orderNumber={orderNumber} open={open} handleClose={handleClose} />
        }
        </>
    )
}

export default Checkout;