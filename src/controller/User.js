import { AddressBook } from '../model/domain/AddressBook.js'
import { Console } from '../view/Console.js'

/**
 * Represents the user of the application.
 */
export class User {
  #addressBook
  #ui

  constructor (addressBook) {
    this.#validateAddressBook(addressBook)
    this.#addressBook = addressBook

    this.#ui = new Console()
  }

  #validateAddressBook (addressBook) {
    if (!(addressBook instanceof AddressBook)) {
      throw new TypeError('addressBook must be an instance of AddressBook.')
    }
  }

  async startUi () {
    // TODO: Add application flow and ui.

    // Debug.
    await this.#ui.printMainMenu()
  }
}
