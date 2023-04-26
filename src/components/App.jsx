import { useState, useEffect } from 'react';
import { Container } from './AppStyled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './FilterContacts';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data=> { 
    
    const existingContact = contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
    if (existingContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = {
      ...data,
      id: nanoid(),
    };
    setContacts(prevState => [newContact, ...prevState]);
    
  };

  // const formSubmitHandler = data => {
  //   contacts.find(({ name }) => name.toLowerCase() === data.name.toLowerCase())
  //     ? alert(`${data.name} is already in contacts`)
  //     : setContacts(prevState => [data, ...prevState]);
  // };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} filter={filter} />
      <ContactList
        contacts={getFiltredContacts()}
        onDeleteContact={deleteContacts}
      />
    </Container>
  );
};
