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
    await this.#showContact()
  }

  async #listAllContacts () {
    await this.#ui.printContacts(this.#addressBook.getContacts())
  }

  async #showContact () {
    const contact = this.#ui.getContactSelection(this.#addressBook.getContacts())
    await this.#ui.printContactPage(contact)
  }

  #startContactUi () {
    // TODO: Get contact menu choice and split logic.
  }
}
