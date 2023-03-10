const fs = require('fs').promises;
const path = require('path');
const {v4: uuidv4} = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');

        if(!contacts) {
            console.log(`Sorry, but the contact database "${path.basename(contactsPath)}" is empty`);
            return;
        }

        return JSON.parse(contacts);
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
        const removedContact = await getContactById(contactId);

        if(!removedContact) {
            console.log(`Sorry, but the contact does not exist in the database`);
            return;
        }

        const contacts = await listContacts();
        const updatedContactsList = contacts.filter(contact => contact.id !== contactId.toString());
        await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));

        console.log(`Contact "${removedContact.name}" with id "${removedContact.id}" has been removed from the database.`);

        return await listContacts();
    } catch (error) {
        console.log(error.message)
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const id = uuidv4();

        contacts.push({
            id,
            name,
            email,
            phone,
        })

        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(`Contact "${name}" with id "${id}" added in database.`);

        return await listContacts();
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

