import React, { useEffect, useState } from 'react';

import axios from 'axios';
 
const PaypalButtonContainer = () => {

    const [formFields, setFormFields] = useState({

        name: '',

        email: '',

        phone: '',

        company: '',

        designation: '',

        state: '',

        city: '',

        address: '',

        report: '',

        id: '',

        user: '',

        country: ''

    });
 
    const [isFormValid, setIsFormValid] = useState(false);
 
    useEffect(() => {

        const script = document.createElement('script');

        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;

        script.async = true;

        document.body.appendChild(script);
 
        script.onload = () => {

            window.paypal.Buttons({

                createOrder: (data, actions) => {

                    return actions.order.create({

                        purchase_units: [{

                            amount: { value: '10.00' } // Replace with dynamic value if needed

                        }]

                    });

                },

                onApprove: (data, actions) => {

                    return actions.order.capture().then(orderData => {

                        console.log('Capture data', orderData);

                        const transaction = orderData.purchase_units[0].payments.captures[0];

                        alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
 
                        axios.post('save_payment_details.php', {

                            paymentID: transaction.id,

                            status: transaction.status,

                            amount: transaction.amount.value,

                            ...formFields

                        })

                        .then(response => {

                            console.log('Payment details saved successfully:', response);

                        })

                        .catch(error => {

                            console.error('Error saving payment details:', error);

                        });

                    });

                }

            }).render('#paypal-button-container');

        };
 
        return () => {

            document.body.removeChild(script);

        };

    }, [formFields]);
 
    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormFields(prevState => ({ ...prevState, [name]: value }));

    };
 
    useEffect(() => {

        const isValid = Object.values(formFields).every(value => value.trim() !== '');

        setIsFormValid(isValid);

    }, [formFields]);
 
    return (
<div>
<div id="paypal-button-container" className="text-center" style={{ pointerEvents: isFormValid ? 'auto' : 'none', opacity: isFormValid ? 1 : 0.5 }}>
<h4><i>Pay with Paypal</i></h4>
</div>

            { !isFormValid && <p id="fill-form-message">Please fill out the form to enable the PayPal button.</p> }

            {Object.keys(formFields).map(field => (
<div key={field}>
<label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
<input 

                        type="text" 

                        id={field} 

                        name={field} 

                        value={formFields[field]} 

                        onChange={handleInputChange} 

                    />

                    {formFields[field].trim() === '' && <span style={{ color: 'red' }}>{field} is required</span>}
</div>

            ))}
</div>

    );

};
 
export default PaypalButtonContainer;

 