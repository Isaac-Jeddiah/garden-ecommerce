import axios from 'axios';
import { 
    createContactRequest, 
    createContactSuccess, 
    createContactFail,
    adminContactMessageRequest,
    adminContactMessageSuccess,
    adminContactMessageFail,
    deleteContactMessageRequest,
    deleteContactMessageSuccess,
    deleteContactMessageFail
} from '../slices/contactSlice';

export const createContact = (contactData) => async (dispatch) => {
    try {
        dispatch(createContactRequest());
        const { data } = await axios.post('/api/v1/contact', contactData);
        dispatch(createContactSuccess(data));
    } catch (error) {
        dispatch(createContactFail(error.response.data.message));
    }
};

export const adminContactMessages = () => async (dispatch) => {
    try {
        dispatch(adminContactMessageRequest());
        const { data } = await axios.get('/api/v1/admin/contact-messages');
        dispatch(adminContactMessageSuccess(data));
    } catch (error) {
        dispatch(adminContactMessageFail(error.response.data.message));
    }
};

export const deleteContactMessage = (id) => async (dispatch) => {
    try {
        dispatch(deleteContactMessageRequest());
        await axios.delete(`/api/v1/admin/contact-message/${id}`);
        dispatch(deleteContactMessageSuccess());
    } catch (error) {
        dispatch(deleteContactMessageFail(error.response.data.message));
    }
};