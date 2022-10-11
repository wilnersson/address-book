import { FilePersistence } from './FilePersistence.js'
// import { MockData } from './MockData.js'

export class PersistenceFacade {
  #dataSource

  constructor () {
    // this.#dataSource = new MockData()
    this.#dataSource = new FilePersistence('data.json')
  }

  async getContacts () {
    return await this.#dataSource.readAllContacts()
  }

  saveContacts (contacts) {
    try {
      this.#dataSource.overWriteAllContacts(contacts)
    } catch (error) {
      throw new Error('Something went wrong, could not write to data source.')
    }
  }
}
