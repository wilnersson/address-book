import collector from '@wilnersson/console-input-collector'
import { Address } from '../model/domain/Address.js'
import { Contact } from '../model/domain/Contact.js'
import { mainMenuItems, contactMenuItems } from './menuEnums.js'

export class Console {
  #mainMenuChoices = []
  #currentMainMenuSelection
  #contactMenuChoices = []
  #currentContactMenuSelection

  #currentContactSelection

  #lastCreatedContact
  #lastCreatedAddress

  constructor () {
    this.#buildMainMenuChoices()
    this.#buildContactMenuChoices()
  }

  #buildMainMenuChoices () {
    for (const item in mainMenuItems) {
      this.#mainMenuChoices.push(mainMenuItems[item].toString())
    }
  }

  #buildContactMenuChoices () {
    for (const item in contactMenuItems) {
      this.#contactMenuChoices.push(contactMenuItems[item].toString())
    }
  }

  async printMainMenu () {
    try {
      this.#clearConsole()
      this.#currentMainMenuSelection = await collector.requestSingleChoiceInput('Main menu', this.#mainMenuChoices)
    } catch (error) {
      this.#alertUser(error.message)
      await this.printMainMenu()
    }
  }

  getMainMenuSelection () {
    return Object.values(mainMenuItems)[this.#currentMainMenuSelection.choiceNumber - 1]
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
    this.#printEmptyLine()
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
    }
  }

  async #printContactMenu () {
    try {
      this.#currentContactMenuSelection = await collector.requestSingleChoiceInput('Contact menu', this.#contactMenuChoices)
    } catch (error) {
      this.#alertUser(error.message)
      await this.printContactMenu()
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

  async printAddAddressPage () {
    this.#clearConsole()
    console.log('--- Add new address ---')
    await this.#collectNewAddressInformation()
  }

  async #collectNewAddressInformation () {
    const newAddress = new Address()
    await this.#collectAddressType(newAddress)
    await this.#collectAddressStreetName(newAddress)
    await this.#collectAddressHouseNumber(newAddress)
    await this.#collectAddressPostalCode(newAddress)
    await this.#collectAddressCity(newAddress)
    await this.#collectAddressCountry(newAddress)
    this.#lastCreatedAddress = newAddress
  }

  async #collectAddressType (address) {
    try {
      const addressType = await collector.requestSingleChoiceInput('Address type:', Address.getAddressTypeEnums())
      address.setAddressType(addressType.choiceText)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectAddressType(address)
    }
  }

  async #collectAddressStreetName (address) {
    try {
      const streetName = await collector.requestStringInput('Street name:')
      address.setStreetName(streetName)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectAddressStreetName(address)
    }
  }

  async #collectAddressHouseNumber (address) {
    try {
      const houseNumber = await collector.requestStringInput('House number:')
      address.setHouseNumber(houseNumber)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectAddressHouseNumber(address)
    }
  }

  async #collectAddressPostalCode (address) {
    try {
      const postalCode = await collector.requestStringInput('Postal code:')
      address.setPostalCode(postalCode)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectAddressPostalCode(address)
    }
  }

  async #collectAddressCity (address) {
    try {
      const city = await collector.requestStringInput('City:')
      address.setCity(city)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectAddressCity(address)
    }
  }

  async #collectAddressCountry (address) {
    try {
      const country = await collector.requestStringInput('Country:')
      address.setCountry(country)
    } catch (error) {
      this.#alertUser(error.message)
      await this.#collectAddressCountry(address)
    }
  }

  getLastCreatedAddress () {
    return this.#lastCreatedAddress
  }

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
