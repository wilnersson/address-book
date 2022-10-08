/**
 * Represents mocked data before adding file i/o or other persistence.
 */

import { Address } from '../domain/Address.js'
import { Contact } from '../domain/Contact.js'

export class MockData {
  readAllContacts () {
    return this.#createContacts()
  }

  #createContacts () {
    const allContacts = []
    const contact = new Contact('Henrik', 'Wilnersson')
    const address = new Address()
    address.setStreetName('Jupitervägen')
    address.setHouseNumber('17C')
    address.setPostalCode('352 64')
    address.setCity('Växjö')
    address.setCountry('Sweden')
    address.setAddressType('Home')

    contact.addAddress(address)

    allContacts.push(contact)

    return allContacts
  }
}
