import React, { useState, useReducer, useMemo, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Filter from './Filter';

import storage from './services/local-storage';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'addContact':
      return [...state, action.payload.contact];

    case 'removeContact':
      return state.filter(contact => contact.id !== action.payload.contactId);

    default:
      return state;
  }
};

export default function App() {
  const [contacts, dispatch] = useReducer(
    contactsReducer,
    storage.get('contacts') || [],
  );

  const handleAddContact = contact => {
    dispatch({ type: 'addContact', payload: { contact } });
  };

  const handleDelete = contactId => {
    dispatch({ type: 'removeContact', payload: { contactId } });
  };

  useEffect(() => {
    storage.save('contacts', contacts);
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const handleSearch = query => {
    setFilter(query);
  };

  const contactsToShow = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);

  const checkIfNameUnique = name =>
    contacts.every(contact => contact.name !== name);

  return (
    <div>
      <h2>Phonebook</h2>

      <ContactForm
        onAddContact={handleAddContact}
        isNameUnique={checkIfNameUnique}
      />

      <section>
        <h2>Contacts</h2>

        {contacts.length ? (
          <>
            <Filter onSearch={handleSearch} />
            <ContactsList contacts={contactsToShow} onDelete={handleDelete} />
          </>
        ) : (
          <p>No saved contacts</p>
        )}
      </section>
    </div>
  );
}
