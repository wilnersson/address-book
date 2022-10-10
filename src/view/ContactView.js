import collector from '@wilnersson/console-input-collector'
import { Contact } from '../model/domain/Contact.js'
import { contactMenuItems } from './menuEnums.js'

export class ContactView {
  #currentContactSelection
  #contactMenuChoices = []
  #currentContactMenuSelection
  #lastCreatedContact

  constructor () {
    this.#buildContactMenuChoices()
  }

  #buildContactMenuChoices () {
    for (const item in contactMenuItems) {
      this.#contactMenuChoices.push(contactMenuItems[item].toString())
    }
  }

  async printContacts (contacts) {
    try {
      this.#clearConsole()
      this.#currentContactSelection = await collector.requestSingleChoiceInput(
        'Contact list',
        contacts.map((contact) => { return contact.getFullName() })
      )
    } catch (error) {
      this.#alertUser(error.message)
      await this.printContacts(contacts)
    }
  }

  getContactSelection (contacts) {
    return contacts[this.#currentContactSelection.choiceNumber - 1]
  }

  async printContactPage (contact) {
    this.#clearConsole()
    this.#printContact(contact)
    this.#printEmptyLine()
    this.#printAddresses(contact.getAddresses())
    await this.#printContactMenu()
  }

  #printContact (contact) {
    console.log('- ' + contact.getFullName())
  }

  #printAddresses (addresses) {
    for (const address of addresses) {
      console.log('--- ' + address.getAddressType() + ' ---')
      console.log(address.getStreetName() + ' ' + address.getHouseNumber())
      console.log(address.getPostalCode() + ' ' + address.getCity())
      console.log(address.getCountry())
      this.#printEmptyLine()
    }
  }

  async #printContactMenu () {
    try {
      this.#currentContactMenuSelection = await collector.requestSingleChoiceInput('Contact menu', this.#contactMenuChoices)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#printContactMenu()
    }
  }

  getContactMenuSelection () {
    return Object.values(contactMenuItems)[this.#currentContactMenuSelection.choiceNumber - 1]
  }

  // TODO: Fix mix of abstraction level?
  async printAddContactPage () {
    this.#clearConsole()
    console.log('--- Add new contact ---')
    await this.#collectNewContactInformation()
  }

  async #collectNewContactInformation () {
    const newContact = new Contact('placeholder', 'placeholder')
    await this.#collectContactFirstName(newContact)
    await this.#collectContactLastName(newContact)
    this.#lastCreatedContact = newContact
  }

  async #collectContactFirstName (contact) {
    try {
      const firstName = await collector.requestStringInput('First name:', Contact.MAX_NAME_LENGTH)
      contact.setFirstName(firstName)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectContactFirstName(contact)
    }
  }

  async #collectContactLastName (contact) {
    try {
      const lastName = await collector.requestStringInput('Last name:', Contact.MAX_NAME_LENGTH)
      contact.setLastName(lastName)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectContactLastName(contact)
    }
  }

  getLastCreatedContact () {
    return this.#lastCreatedContact
  }

  // TODO: Refactor helpers to own class.
  #alertUser (message) {
    console.log(message + '\n')
  }

  #clearConsole () {
    console.clear()
  }

  #printEmptyLine () {
    console.log()
  }
}
