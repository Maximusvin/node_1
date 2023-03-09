const fs = require('fs').promises;
const path = require('path');
const {v4: uuidv4} = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        return JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
    } catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();

        return contacts.find(contact => contact.id === contactId.toString());
    } catch (error) {
        console.log(error.message)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();

        return [...contacts].filter(contact => contact.id !== contactId.toString());
    } catch (error) {
        console.log(error.message)
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = [...(await listContacts())];

        contacts.push({
            id: uuidv4(),
            name,
            email,
            phone,
        })

        return contacts;
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    listContacts,
    removeContact,
    getContactById,
    addContact
}

