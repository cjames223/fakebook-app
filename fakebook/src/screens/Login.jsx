import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import Register from '../screens/Register'
import jwt_decode from 'jwt-decode'

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom'
import { signin } from '../actions/auth';

function Login () {
    const [showMessage, setShowMessage] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    const onSubmit = async (data, form) => {
        try {
            dispatch(signin(data, navigate))
            setShowMessage(true);
    
            form.restart();    
        } catch (error) {
            console.log(error)
        }
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
 
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "67481211208-b6dogqovrfb3ue9p1833irqsg7s1c1jh.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('google-login'),
            { theme: 'outline', size: 'large', width: 'fit-content'}
        )
    }, [])

    const handleCallbackResponse = async (res) => {
        const result = jwt_decode(res.credential)
        const token = res?.credential

        try {
            dispatch({ type: 'AUTH', data: { result, token }})
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        
            <div className='login-container'>
                <div className='login-text'>
                    <h1 className='login-text-title'>fakebook</h1>
                    <h2 className='login-text-subtext'>Connect with friends and the world around you with Fakebook.</h2>
                </div>

                <div className="login-form">
                    <div >
                        <div className="login-card">
                            <Form onSubmit={onSubmit} initialValues={{ email: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <Field name="email" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })}  />
                                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="password" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} feedback={false}  />
                                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />

                                    <Button type="submit" label="Log In" />
                                    <div className='google-login-container'>
                                        <div id='google-login' />
                                    </div>
                                    <hr className='login-break' />

                                </form>
                            )} />
                        </div>
                    </div>

                <Register />

            </div>
            </div>
        
    );
}

export default Login