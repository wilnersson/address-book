import collector from '@wilnersson/console-input-collector'
import { mainMenuItems } from './menuEnums.js'

export class MainView {
  #mainMenuChoices = []
  #currentMainMenuSelection

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

  // TODO: Refactor to helper class.
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
