import { useState, useEffect } from 'react';
import ConstactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList ';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saveContact = localStorage.getItem('key');
    if (saveContact !== null) {
      const parseContact = JSON.parse(saveContact);
      return parseContact;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('key', JSON.stringify(contacts));
  }, [contacts]);

  const addContactsList = newContact => {
    const trueFilter = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (trueFilter) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    setContacts(prevState => {
      return [...prevState, { ...newContact, id: nanoid() }];
    });
  };

  const filterContacts = () => {
    const normalName = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalName)
    );
  };

  const onFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const deletedContacts = nameId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== nameId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ConstactForm onSubmit={addContactsList} />
      {contacts.length > 0 ? (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={onFilterChange} />
          <ContactList
            onFilterContacts={filterContacts()}
            onChange={deletedContacts}
          />
        </>
      ) : (
        <h2>"Contact list is empty"</h2>
      )}
    </div>
  );
}
