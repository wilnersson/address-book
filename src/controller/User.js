import { AddressBook } from '../model/domain/AddressBook.js'

/**
 * Represents the user of the application.
 */
export class User {
  #addressBook

  constructor (addressBook) {
    this.#validateAddressBook(addressBook)
    this.#addressBook = addressBook
  }

  #validateAddressBook (addressBook) {
    if (!(addressBook instanceof AddressBook)) {
      throw new TypeError('addressBook must be an instance of AddressBook.')
    }
  }

  startUi () {
    // TODO: Add application flow and ui.

    // Debug.
    console.log('Welcome to the address book!')
    console.log(this.#addressBook.getContacts())
  }
}
