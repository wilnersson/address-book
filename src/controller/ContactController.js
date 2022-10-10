/**
 * Controller for contacts.
 */
export class ContactController {
  #addressBook
  #ui

  constructor (addressBook, ui) {
    this.#addressBook = addressBook
    this.#ui = ui
  }

  async startUi () {
    await this.#ui.printAddContactPage()
    this.#addContactToAddressBook()
  }

  #addContactToAddressBook () {
    const newContact = this.#ui.getLastCreatedContact()
    this.#addressBook.addContact(newContact)
  }
}
