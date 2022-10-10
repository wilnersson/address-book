import { AddressBook } from '../model/domain/AddressBook.js'
import { Console } from '../view/Console.js'
import { mainMenuItems } from '../view/menuEnums.js'
import { ContactController } from './ContactController.js'
import { ContactListController } from './ContactListController.js'

/**
 * Represents the user of the application.
 */
export class UserController {
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
      await this.#runMainMenuItem()
    } while (this.#userDoesNotWantToQuit())
  }

  #userDoesNotWantToQuit () {
    return this.#ui.getMainMenuSelection().value !== mainMenuItems.QUIT.value
  }

  async #runMainMenuItem () {
    switch (this.#ui.getMainMenuSelection().value) {
      case mainMenuItems.LIST_CONTACTS.value:
        await this.#runContactList()
        break
      case mainMenuItems.ADD_CONTACT.value:
        await this.#runAddContact()
        break
      case mainMenuItems.QUIT.value:
        break
    }
  }

  async #runContactList () {
    const contactListController = new ContactListController(this.#addressBook, this.#ui)
    await contactListController.startUi()
  }

  async #runAddContact () {
    const contactController = new ContactController(this.#addressBook, this.#ui)
    await contactController.startAddNewContact()
  }
}
