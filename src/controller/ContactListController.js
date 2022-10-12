import { contactMenuItems } from '../view/menuEnums.js'
import { ContactController } from './ContactController.js'

/**
 * Controller for listing contacts.
 */
export class ContactListController {
  #addressBook
  #viewFactory
  #view

  #currentContact

  constructor (addressBook, viewFactory) {
    this.#addressBook = addressBook
    this.#viewFactory = viewFactory
    this.#view = this.#viewFactory.getContactView()
  }

  async startUi () {
    if (this.#addressBook.getContacts().length > 0) {
      await this.#listAllContacts()
      await this.#startContactUi()
    } else {
      await this.#view.printNoContactsPage()
    }
  }

  async #listAllContacts () {
    await this.#view.printContacts(this.#addressBook.getContacts())
  }

  async #startContactUi () {
    do {
      await this.#runContactPage()
      await this.#runContactMenuItem()
    } while (this.#userDoesNotWantToGoBack())
  }

  async #runContactPage () {
    this.#currentContact = this.#view.getContactSelection(this.#addressBook.getContacts())
    await this.#view.printContactPage(this.#currentContact)
  }

  #userDoesNotWantToGoBack () {
    if (this.#checkCurrentContactDeleted()) {
      return false
    }
    return this.#view.getContactMenuSelection().value !== contactMenuItems.BACK.value
  }

  #checkCurrentContactDeleted () {
    return this.#currentContact === undefined
  }

  async #runContactMenuItem () {
    switch (this.#view.getContactMenuSelection().value) {
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
