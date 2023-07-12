import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import 'react-toastify/dist/ReactToastify.css';
import { errorNotifyOptions, succesNotifyOptions } from 'notification';

import css from './App.module.css';
const { section, contacts_container, contact_list_title } = css;

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const normalizedContact = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedContact)
  );

  useEffect(() => {
    const storagedContacts = localStorage.getItem(
      'contacts',
      JSON.stringify(contacts)
    );
    const parsedContacts = JSON.parse(storagedContacts) ?? [];

    setContacts(parsedContacts);
  }, [contacts]);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContactToList = contact => {
    if (contacts.some(user => user.name === contact.name)) {
      toast.error('This contanct already added', errorNotifyOptions);
      return;
    }

    setContacts(state => [contact, ...state]);

    toast.success('Contact seccesfuly added!', succesNotifyOptions);
  };

  const removeContactFromList = index => {
    setContacts(state => state.filter((contact, i) => i !== index));
  };

  const filterContacts = ({ target }) => {
    setFilter(target.value);
  };

  return (
    <section className={section}>
      <ContactForm addContact={addContactToList} />

      <div className={contacts_container}>
        <h3 className={contact_list_title}>Contact List</h3>
        {contacts.length === 0 ? (
          <h3 className={contact_list_title}>There are no contacts</h3>
        ) : (
          <>
            <Filter onChange={filterContacts} value={filter} />
            <ContactList
              contacts={filteredContacts}
              removeContact={removeContactFromList}
            />
          </>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};
