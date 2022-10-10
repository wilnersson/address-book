/**
 * Controller for contacts.
 */
export class ContactController {
  #addressBook
  #contactUi
  #addressUi

  constructor (addressBook, viewFactory) {
    this.#addressBook = addressBook
    this.#contactUi = viewFactory.getContactView()
    this.#addressUi = viewFactory.getAddressView()
  }

  async startAddNewContact () {
    await this.#contactUi.printAddContactPage()
    this.#addContactToAddressBook()
  }

  #addContactToAddressBook () {
    const newContact = this.#contactUi.getLastCreatedContact()
    this.#addressBook.addContact(newContact)
  }

  async startAddNewAddress (contact) {
    await this.#addressUi.printAddAddressPage()
    this.#addAddressToContact(contact)
  }

  #addAddressToContact (contact) {
    const newAddress = this.#addressUi.getLastCreatedAddress()
    contact.addAddress(newAddress)
  }
}
