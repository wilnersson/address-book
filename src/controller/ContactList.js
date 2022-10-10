import { contactMenuItems } from '../view/menuEnums.js'

/**
 * Controller for listing contacts.
 */
export class ContactList {
  #addressBook
  #ui

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
      await this.#showContact()
      this.#runContactMenuItem()
    } while (this.#userDoesNotWantToGoBack())
  }

  async #showContact () {
    const contact = this.#ui.getContactSelection(this.#addressBook.getContacts())
    await this.#ui.printContactPage(contact)
  }

  #userDoesNotWantToGoBack () {
    return this.#ui.getContactMenuSelection().value !== contactMenuItems.BACK.value
  }

  #runContactMenuItem () {
    switch (this.#ui.getContactMenuSelection().value) {
      case contactMenuItems.ADD_ADDRESS.value:
        // TODO: Add add address logic.
        break
      case contactMenuItems.BACK.value:
        break
    }
  }
}
