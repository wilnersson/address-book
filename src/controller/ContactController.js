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

  async startAddNewContact () {
    await this.#ui.printAddContactPage()
    this.#addContactToAddressBook()
  }

  #addContactToAddressBook () {
    const newContact = this.#ui.getLastCreatedContact()
    this.#addressBook.addContact(newContact)
  }

  async startAddNewAddress (contact) {
    await this.#ui.printAddAddressPage()
    this.#addAddressToContact(contact)
  }

  #addAddressToContact (contact) {
    const newAddress = this.#ui.getLastCreatedAddress()
    contact.addAddress(newAddress)
  }
}
