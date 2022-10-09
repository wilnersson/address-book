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
    this.#showContact()
  }

  async #listAllContacts () {
    await this.#ui.printContacts(this.#addressBook.getContacts())
  }

  #showContact () {
    const contact = this.#ui.getContactSelection(this.#addressBook.getContacts())

    // Debug
    console.log('You selected: ' + contact.getFullName())
  }
}
