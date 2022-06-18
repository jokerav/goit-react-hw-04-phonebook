import { nanoid } from 'nanoid';
import ContactForm from './ContactsForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useState } from 'react';
import { useEffect } from 'react';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // я так и не понял, что Вы имели ввиду
  // то-есть начальное значение contacts или [] или контакты из локального хранилища
  // и тогда один useEffect станет не нужен?
  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(localContacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isNameInPhonebook = name => {
    const nameInLowerCase = name.toLowerCase();
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === nameInLowerCase) {
        return true;
      }
    }
    return false;
  };
  const addContact = contact => {
    const { name } = contact;
    if (!isNameInPhonebook(name)) {
      contact.id = nanoid(5);
      setContacts(prevContacts => [...prevContacts, contact]);
    } else {
      alert(`${name} is already in contacts`);
    }
  };
  const onFilterChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normFilter)
  );
  return (
    <div
      style={{
        fontSize: 22,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <Filter value={filter} onChange={onFilterChange} />
      <h2>Contacts</h2>
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
};
