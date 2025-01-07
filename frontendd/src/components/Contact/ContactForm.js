'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../../actions/contactActions';
import { clearError, clearMessageSent } from '../../slices/contactSlice';
import { toast } from 'react-toastify';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const socialLinks = [
  { Icon: Facebook, href: '#' },
  { Icon: Twitter, href: '#' },
  { Icon: Instagram, href: '#' },
  { Icon: Youtube, href: '#' },
];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { loading, error, isMessageSent } = useSelector(state => state.contactState);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email, phoneNumber, subject, message };
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
      setSubject('');
      setMessage('');
    }
  }, [dispatch, error, isMessageSent]);

  return (
    <div className="bg-green-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-emerald-500 font-semibold">Send Us A Message</h2>
            <h3 className="text-2xl text-white font-bold">Get in touch</h3>
            <p className="text-gray-300">
              We are here to help. Please complete the short form below and we'll respond as soon as possible.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-navy-800 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-navy-800 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone No."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="bg-navy-800 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="bg-navy-800 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-navy-800 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-black px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
