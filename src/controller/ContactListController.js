import { contactMenuItems } from '../view/menuEnums.js'
import { ContactController } from './ContactController.js'

/**
 * Controller for listing contacts.
 */
export class ContactListController {
  #addressBook
  #viewFactory
  #ui

  #currentContact

  constructor (addressBook, viewFactory) {
    this.#addressBook = addressBook
    this.#viewFactory = viewFactory
    this.#ui = this.#viewFactory.getContactView()
  }

  async startUi () {
    await this.#listAllContacts()
    await this.#startContactUi()
  }

  async #listAllContacts () {
    await this.#ui.printContacts(this.#addressBook.getContacts())
  }

  async #startContactUi () {
    do {
      await this.#runContactPage()
      await this.#runContactMenuItem()
    } while (this.#userDoesNotWantToGoBack())
  }

  async #runContactPage () {
    this.#currentContact = this.#ui.getContactSelection(this.#addressBook.getContacts())
    await this.#ui.printContactPage(this.#currentContact)
  }

  #userDoesNotWantToGoBack () {
    if (this.#checkCurrentContactDeleted()) {
      return false
    }
    return this.#ui.getContactMenuSelection().value !== contactMenuItems.BACK.value
  }

  #checkCurrentContactDeleted () {
    return this.#currentContact === undefined
  }

  async #runContactMenuItem () {
    switch (this.#ui.getContactMenuSelection().value) {
      case contactMenuItems.ADD_ADDRESS.value:
        await this.#runAddAddress()
        break
      case contactMenuItems.DELETE_CONTACT.value:
        this.#runDeleteContact()
        break
      case contactMenuItems.BACK.value:
        break
    }
  }

  async #runAddAddress () {
    const contactController = new ContactController(this.#addressBook, this.#viewFactory)
    await contactController.startAddNewAddress(this.#currentContact)
  }

  #runDeleteContact () {
    this.#addressBook.removeContact(this.#currentContact)
    this.#currentContact = undefined
  }
}
