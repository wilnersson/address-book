import { MockData } from './MockData.js'

export class PersistenceFacade {
  #dataSource

  constructor () {
    this.#dataSource = new MockData()
  }

  getContacts () {
    return this.#dataSource.readAllContacts()
  }

  saveContacts (contacts) {
    try {
      this.#dataSource.overWriteAllContacts(contacts)
    } catch (error) {
      throw new Error('Something went wrong, could not write to data source.')
    }
  }
}
