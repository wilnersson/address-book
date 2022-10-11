import collector from '@wilnersson/console-input-collector'
import { mainMenuItems } from './menuEnums.js'
import { ViewHelper } from './ViewHelper.js'

export class MainView {
  #mainMenuChoices = []
  #currentMainMenuSelection

  #viewHelper

  constructor () {
    this.#buildMainMenuChoices()
    this.#viewHelper = new ViewHelper()
  }

  #buildMainMenuChoices () {
    for (const item in mainMenuItems) {
      this.#mainMenuChoices.push(mainMenuItems[item].toString())
    }
  }

  async printMainMenu () {
    try {
      // this.#viewHelper.clearConsole()
      this.#currentMainMenuSelection = await collector.requestSingleChoiceInput('Main menu', this.#mainMenuChoices)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.printMainMenu()
    }
  }

  getMainMenuSelection () {
    return Object.values(mainMenuItems)[this.#currentMainMenuSelection.choiceNumber - 1]
  }
}
