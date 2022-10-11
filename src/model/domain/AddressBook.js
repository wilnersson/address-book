import { PersistenceFacade } from '../persistence/PersistenceFacade.js'
import { Contact } from './Contact.js'

/**
 * Represents a collection of contacts.
 */
export class AddressBook {
  #contacts = new Set()
  #persistence

  constructor () {
    this.#persistence = new PersistenceFacade()
  }

  async loadContactsFromPersistence () {
    const contacts = await this.#persistence.getContacts()
    for (const contact of contacts) {
      this.#contacts.add(contact)
    }
  }

  async saveContactsToPersistence () {
    this.#persistence.saveContacts(Array.from(this.#contacts))
  }

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
    return Array.from(this.#contacts)
  }
}
