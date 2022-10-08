import { Contact } from './Contact.js'

/**
 * Represents a collection of contacts.
 */
export class AddressBook {
  #contacts = new Set()

  // TODO: Add constructor and fetch existing contacts from persistence.

  addContact (contact) {
    this.#validateContact(contact)
    this.#contacts.add(contact)
  }

  removeContact (contact) {
    this.#validateContact(contact)
    this.#contacts.delete(contact)
  }

  #validateContact (contact) {
    if (!(contact instanceof Contact)) {
      throw new TypeError('contact must be an instance of Contact.')
    }
  }

  getContacts () {
    return this.#contacts
  }
}
