import collector from '@wilnersson/console-input-collector'
import { mainMenuItems } from './menuEnums.js'

export class Console {
  #mainMenuChoices = []
  #currentMainMenuSelection
  #currentContactSelection

  constructor () {
    this.#buildMainMenuChoices()
  }

  #buildMainMenuChoices () {
    for (const item in mainMenuItems) {
      this.#mainMenuChoices.push(mainMenuItems[item].toString())
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

  #alertUser (message) {
    console.log(message + '\n')
  }

  #clearConsole () {
    console.clear()
  }
}
