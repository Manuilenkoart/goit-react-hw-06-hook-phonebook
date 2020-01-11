import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import css from './ContactList.module.css';

export default function ContactsList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map(contact => (
        <li className={css.contactList} key={uuidv1()}>
          <span className={css.contactListName}>{contact.name}: </span>
          <span className={css.contactListNumber}>{contact.number}</span>
          <button type="button" onClick={() => onDelete(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};
