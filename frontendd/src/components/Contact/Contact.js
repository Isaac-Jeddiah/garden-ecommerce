import React from 'react';
import { ContactInfo } from './ContactInfo'; // Import as named export
import { ContactForm } from './ContactForm'; // Import as named export
import StoreLocator from '../StoreLocator';

const Contact = () => {
  return (
    <div>
      <ContactInfo />
      <ContactForm />
      <StoreLocator />
    </div>
  );
};

export default Contact;
