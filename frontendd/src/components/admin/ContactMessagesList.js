import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminContactMessages, deleteContactMessage } from '../../actions/contactActions';
import { clearError, clearMessageDeleted } from '../../slices/contactSlice';
import { toast } from 'react-toastify';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';

export default function ContactMessagesList() {
    const { contactMessages = [], loading, error, isMessageDeleted } = useSelector(state => state.contactState);
    const dispatch = useDispatch();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    const setMessages = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Email', field: 'email', sort: 'asc' },
                { label: 'Phone Number', field: 'phoneNumber', sort: 'asc' },
                { label: 'Subject', field: 'subject', sort: 'asc' }, // New column
                { label: 'Date', field: 'createdAt', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }
            ],
            rows: []
        };

        contactMessages.forEach(message => {
            data.rows.push({
                id: message._id,
                name: message.name,
                email: message.email,
                phoneNumber: message.phoneNumber,
                subject: message.subject, // Add subject
                createdAt: new Date(message.createdAt).toLocaleDateString(),
                actions: (
                    <div>
                        <button 
                            className="btn btn-info py-1 px-2 mr-2" 
                            onClick={() => handleViewMessage(message)}
                        >
                            <i className="fa fa-eye"></i>
                        </button>
                        <button 
                            className="btn btn-danger py-1 px-2" 
                            onClick={() => deleteHandler(message._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                )
            });
        });

        return data;
    };

    const deleteHandler = (id) => {
        dispatch(deleteContactMessage(id));
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
        }

        if (isMessageDeleted) {
            toast('Message deleted successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(adminContactMessages())
            });
        }

        dispatch(adminContactMessages());
    }, [dispatch, error, isMessageDeleted]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Contact Messages</h1>
                <Fragment>
                    {loading ? <Loader /> : 
                        <MDBDataTable
                            data={setMessages()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </Fragment>

                {selectedMessage && (
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Message Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Name:</strong> {selectedMessage.name}</p>
                            <p><strong>Email:</strong> {selectedMessage.email}</p>
                            <p><strong>Phone:</strong> {selectedMessage.phoneNumber}</p>
                            <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                            <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                            <p><strong>Message:</strong></p>
                            <p>{selectedMessage.message}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
}