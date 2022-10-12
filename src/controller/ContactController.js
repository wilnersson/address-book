/**
 * Controller for contacts.
 */
export class ContactController {
  #addressBook
  #contactView
  #addressView

  constructor (addressBook, viewFactory) {
    this.#addressBook = addressBook
    this.#contactView = viewFactory.getContactView()
    this.#addressView = viewFactory.getAddressView()
  }

  async startAddNewContact () {
    await this.#contactView.printAddContactPage()
    this.#addContactToAddressBook()
  }

  #addContactToAddressBook () {
    const newContact = this.#contactView.getLastCreatedContact()
    this.#addressBook.addContact(newContact)
  }

  async startAddNewAddress (contact) {
    await this.#addressView.printAddAddressPage()
    this.#addAddressToContact(contact)
  }

  #addAddressToContact (contact) {
    const newAddress = this.#addressView.getLastCreatedAddress()
    contact.addAddress(newAddress)
  }
}
