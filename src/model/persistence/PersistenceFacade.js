import { FilePersistence } from './FilePersistence.js'

export class PersistenceFacade {
  #dataSource

  constructor () {
    this.#dataSource = new FilePersistence('data.json')
  }

  async getContacts () {
    return await this.#dataSource.readAllContacts()
  }

  async saveContacts (contacts) {
    try {
      await this.#dataSource.overWriteAllContacts(contacts)
    } catch (error) {
      throw new Error('Something went wrong, could not write to data source.')
    }
  }
}
