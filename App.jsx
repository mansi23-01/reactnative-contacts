import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const ContactsApp = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingContactId, setEditingContactId] = useState(null);

  // Add 20 dummy contacts
  useState(() => {
    const dummyContacts = Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      name: `Contact ${index + 1}`,
      phone: `123456789${index}`,
    }));
    setContacts(dummyContacts);
  }, []);

  const addContact = () => {
    if (editingContactId) {
      // Editing an existing contact
      const updatedContacts = contacts.map((contact) =>
        contact.id === editingContactId ? { ...contact, name, phone } : contact
      );
      setContacts(updatedContacts);
      setEditingContactId(null);
    } else {
      // Adding a new contact
      setContacts([...contacts, { id: Date.now().toString(), name, phone }]);
    }
    setName('');
    setPhone('');
  };

  const editContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditingContactId(contact.id);
  };

  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Contacts App
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          style={{ flex: 1, marginRight: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={{ flex: 1, marginRight: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Button title={editingContactId ? 'Save' : 'Add'} onPress={addContact} />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.phone}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Button title="Edit" onPress={() => editContact(item)} />
              <Button title="Delete" onPress={() => deleteContact(item.id)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ContactsApp;
