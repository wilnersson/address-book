import collector from '@wilnersson/console-input-collector'

export class Console {
  #mainMenuChoices

  constructor () {
    this.#buildMainMenuChoices()
  }

  #buildMainMenuChoices () {
    const choices = []
    choices.push('List your contacts')
    choices.push('Add a contact')
    choices.push('Exit')

    this.#mainMenuChoices = choices
  }

  async printMainMenu () {
    await collector.requestSingleChoiceInput('Main menu', this.#mainMenuChoices)
  }
}
