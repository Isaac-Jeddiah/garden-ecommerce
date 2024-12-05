import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { createContact } from '../../actions/contactActions';
//import { clearError, clearMessageSent } from '../../slices/contactSlice';
import { toast } from 'react-toastify';

import { createContact } from '../actions/contactActions';
import { clearError, clearMessageSent } from '../slices/contactSlice';



export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState(''); // New state for subject
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const { loading, error, isMessageSent } = useSelector(state => state.contactState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = { name, email, phoneNumber, subject, message }; // Include subject
        dispatch(createContact(formData));
    };
    

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
        }

        if (isMessageSent) {
            toast('Message sent successfully!', {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'success',
                onOpen: () => { dispatch(clearMessageSent()) }
            });
            // Reset form
            setName('');
            setEmail('');
            setPhoneNumber('');
            setSubject(''); // Reset subject
            setMessage('');
        }
    }, [dispatch, error, isMessageSent]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea 
                                className="form-control" 
                                rows="5"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block" 
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}