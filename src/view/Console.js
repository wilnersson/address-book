import collector from '@wilnersson/console-input-collector'
import { mainMenuItems, contactMenuItems } from './menuEnums.js'

export class Console {
  #mainMenuChoices = []
  #currentMainMenuSelection
  #contactMenuChoices = []
  #currentContactMenuSelection

  #currentContactSelection

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
