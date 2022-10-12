import { AddressBook } from '../model/domain/AddressBook.js'
import { mainMenuItems } from '../view/menuEnums.js'
import { ContactController } from './ContactController.js'
import { ContactListController } from './ContactListController.js'

/**
 * Represents the user of the application.
 */
export class UserController {
  #addressBook
  #view
  #viewFactory

  constructor (addressBook, viewFactory) {
    this.#validateAddressBook(addressBook)
    this.#addressBook = addressBook
    this.#viewFactory = viewFactory

    this.#view = this.#viewFactory.getMainView()
  }

  #validateAddressBook (addressBook) {
    if (!(addressBook instanceof AddressBook)) {
      throw new TypeError('addressBook must be an instance of AddressBook.')
    }
  }

  async startUi () {
    do {
      await this.#view.printMainMenu()
      await this.#runMainMenuItem()
    } while (this.#userDoesNotWantToQuit())

    await this.#saveApplicationState()
  }

  #userDoesNotWantToQuit () {
    return this.#view.getMainMenuSelection().value !== mainMenuItems.QUIT.value
  }

  async #runMainMenuItem () {
    switch (this.#view.getMainMenuSelection().value) {
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
    const contactListController = new ContactListController(this.#addressBook, this.#viewFactory)
    await contactListController.startUi()
  }

  async #runAddContact () {
    const contactController = new ContactController(this.#addressBook, this.#viewFactory)
    await contactController.startAddNewContact()
  }

  async #saveApplicationState () {
    await this.#addressBook.saveContactsToPersistence()
  }
}
