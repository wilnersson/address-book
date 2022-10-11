import { Address } from '../domain/Address.js'
import { Contact } from '../domain/Contact.js'

/**
 * Handles persistence with mocked, temporary data. Does not save, good for testing.
 */
export class MockData {
  readAllContacts () {
    return this.#createContacts()
  }

  #createContacts () {
    const allContacts = []
    const contact = new Contact('John', 'Doe')
    const address = new Address()
    address.setStreetName('Example road')
    address.setHouseNumber('1')
    address.setPostalCode('111 11')
    address.setCity('Sampletown')
    address.setCountry('Nowheretania')
    address.setAddressType('Home')

    contact.addAddress(address)

    allContacts.push(contact)

    return allContacts
  }

  overWriteAllContacts () {
    console.log('Currently using mocked data, no data has been saved.')
  }
}
