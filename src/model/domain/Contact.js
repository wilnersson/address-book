import { Address } from './Address.js'

/**
 * Represents a physical person.
 */
export class Contact {
  #firstName
  #lastName
  #addresses = new Set()

  constructor (firstName, lastName) {
    this.setFirstName(firstName)
    this.setLastName(lastName)
  }

  setFirstName (firstName) {
    this.#validateName(firstName)
    this.#firstName = firstName
  }

  getFirstName () {
    return this.#firstName
  }

  setLastName (lastName) {
    this.#validateName(lastName)
    this.#lastName = lastName
  }

  getLastName () {
    return this.#lastName
  }

  #validateName (name) {
    const error = new TypeError('Name must be a string with at least 2 characters.')

    if (typeof name !== 'string') throw error
    if (name.length < 2) throw error
  }

  addAddress (address) {
    this.#validateAddress(address)
    this.#addresses.add(address)
  }

  removeAddress (address) {
    this.#validateAddress(address)
    this.#addresses.delete(address)
  }

  #validateAddress (address) {
    if (!(address instanceof Address)) {
      throw new TypeError('address must be an instance of Address.')
    }
  }

  getAddresses () {
    return this.#addresses
  }
}
