import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

export default function App() {
 
    const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

    const [findContacts, setFindContacts] = useState("")
    
    const searchContacts = contacts.filter(contact => contact.name.toLowerCase().includes(findContacts.toLowerCase()))
        
    const addContact = (newContact) => {
    setContacts((prevContacts) => {
    const updatedContacts = [...prevContacts, newContact];
    return updatedContacts;
  });
};
    
    const onDelete = (contactId) => {
       setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  }
  
  //    useEffect(() => {
  //   const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (savedContacts) {
  //     setContacts(savedContacts);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  return (
    <div >
      <h1>Phonebook</h1>
          <ContactForm onAdd={addContact} />
          <SearchBox value={findContacts} onFind={setFindContacts} />
          <ContactList contacts={searchContacts} onDelete={onDelete} />
          
    </div>
  );
}
