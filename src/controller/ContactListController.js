import { contactMenuItems } from '../view/menuEnums.js'
import { ContactController } from './ContactController.js'

/**
 * Controller for listing contacts.
 */
export class ContactListController {
  #addressBook
  #ui

  #currentContact

  constructor (addressBook, ui) {
    this.#addressBook = addressBook
    this.#ui = ui
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
    return this.#ui.getContactMenuSelection().value !== contactMenuItems.BACK.value
  }

  async #runContactMenuItem () {
    switch (this.#ui.getContactMenuSelection().value) {
      case contactMenuItems.ADD_ADDRESS.value:
        await this.#runAddAddress()
        break
      case contactMenuItems.BACK.value:
        break
    }
  }

  async #runAddAddress () {
    const contactController = new ContactController(this.#addressBook, this.#ui)
    await contactController.startAddNewAddress(this.#currentContact)
  }
}
