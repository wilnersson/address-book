import { AddressBook } from '../model/domain/AddressBook.js'
import { Console } from '../view/Console.js'
import { mainMenuItems } from '../view/menuEnums.js'

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
    do {
      await this.#ui.printMainMenu()
      this.#runMainMenuItem()
    } while (this.#userDoesNotWantToQuit())
  }

  #runMainMenuItem () {
    switch (this.#ui.getMainMenuSelection().value) {
      case mainMenuItems.LIST_CONTACTS.value:
        // TODO: Implement contact list logic.
        console.log('List contacts please...')
        break
      case mainMenuItems.ADD_CONTACT.value:
        // TODO: Implement add contact logic.
        break
      case mainMenuItems.QUIT.value:
        break
    }
  }

  #userDoesNotWantToQuit () {
    return this.#ui.getMainMenuSelection().value !== mainMenuItems.QUIT.value
  }
}
