const path = require("path");
const fs = require("fs").promises;

const shortid = require("shortid");

// const contactsParsed = JSON.parse()
const dbPath = path.resolve("./db/contacts.json");

async function parseContacts() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const data = await parseContacts();
    console.table(data);
  } catch (error) {}
}

async function getContactById(contactId) {
  try {
    const data = await parseContacts();
    contact = data.filter((item) => {
      return item.id === contactId.toString();
    });
    if (contact[0]) {
      console.log(contact[0]);
    } else {
      console.log(`User with id ${contactId} not found`);
    }
  } catch (error) {}
}

async function removeContact(contactId) {
  try {
    const data = await parseContacts();
    const contacts = data.filter((item) => {
      return item.id !== contactId.toString();
    });
    await fs.writeFile(dbPath, JSON.stringify(contacts));
    console.log("Contact removed!");
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await parseContacts();
    data.push({
      id: shortid.generate().toString(),
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
    });
    await fs.writeFile(dbPath, JSON.stringify(data));
    console.log("New contact created!");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
