import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function ContactForm({ onAddContact, isNameUnique }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameInput = e => {
    setName(e.target.value);
  };

  const handleNumberInput = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!isNameUnique(name)) {
      toast.warning(`Contact ${name} already exists`);
      return;
    }

    const newContact = { id: uuidv1(), name, number };
    onAddContact(newContact);

    setName('');
    setNumber('');
  };

  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    setBtnDisabled(!name || !number);
  }, [name, number]);

  return (
    <form onSubmit={handleSubmit}>
      <span>Name: </span>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={handleNameInput}
      />
      <span>Number: </span>
      <input
        id="number"
        name="number"
        type="tel"
        value={number}
        onChange={handleNumberInput}
      />
      <button type="submit" disabled={btnDisabled}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  isNameUnique: PropTypes.func.isRequired,
};
