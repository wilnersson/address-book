import fs from 'fs/promises'
import { Address } from '../domain/Address.js'
import { Contact } from '../domain/Contact.js'

/**
 * Handles persistence as a .json file.
 */
export class FilePersistence {
  #fileName
  #FILE_PATH = './data/'
  #fileContent

  constructor (fileName) {
    this.#fileName = fileName
  }

  async readAllContacts () {
    await this.#loadContentFromFile()
    return this.#parseContactsData()
  }

  async #loadContentFromFile () {
    try {
      this.#fileContent = await fs.readFile(this.#FILE_PATH + this.#fileName, {
        encoding: 'utf-8'
      })
    } catch (error) {
      // Check for file not found error.
      if (error.code === 'ENOENT') {
        await this.#createFile()
      }
    }
  }

  async #createFile () {
    const startingData = []
    await fs.writeFile(this.#FILE_PATH + this.#fileName, JSON.stringify(startingData), {
      encoding: 'utf-8'
    })

    await this.#loadContentFromFile()
  }

  #parseContactsData () {
    const data = this.#getParsedDataFromFileContent()
    return this.#getContactsFromParsedData(data)
  }

  #getParsedDataFromFileContent () {
    return JSON.parse(this.#fileContent)
  }

  #getContactsFromParsedData (data) {
    const contacts = []

    for (const contactData of data) {
      contacts.push(this.#getSingleContactFromParsedData(contactData))
    }

    return contacts
  }

  #getSingleContactFromParsedData (contactData) {
    const newContact = new Contact(contactData.firstName, contactData.lastName)

    if (contactData.addresses) {
      const addresses = this.#parseAddressesFromData(contactData)
      addresses.forEach((address) => {
        newContact.addAddress(address)
      })
    }

    return newContact
  }

  #parseAddressesFromData (contactData) {
    const addresses = []

    for (const address of contactData.addresses) {
      addresses.push(
        new Address(
          address.streetName,
          address.houseNumber,
          address.postalCode,
          address.city,
          address.country,
          address.addressType
        )
      )
    }

    return addresses
  }

  async overWriteAllContacts (contacts) {
    const data = this.#stringifyContactObjects(contacts)
    await fs.writeFile(this.#FILE_PATH + this.#fileName, data, {
      encoding: 'utf-8'
    })
  }

  #stringifyContactObjects (contacts) {
    const contactObjects = this.#convertContactsToObjects(contacts)
    return JSON.stringify(contactObjects)
  }

  #convertContactsToObjects (contacts) {
    const contactObjects = []

    for (const contact of contacts) {
      contactObjects.push(this.#convertSingleContactToObject(contact))
    }

    return contactObjects
  }

  #convertSingleContactToObject (contact) {
    const contactObject = {}

    contactObject.firstName = contact.getFirstName()
    contactObject.lastName = contact.getLastName()

    if (contact.getAddresses().length > 0) {
      contactObject.addresses = this.#convertAddressesToObjects(contact.getAddresses())
    }

    return contactObject
  }

  #convertAddressesToObjects (addresses) {
    const addressObjects = []

    for (const address of addresses) {
      addressObjects.push({
        streetName: address.getStreetName(),
        houseNumber: address.getHouseNumber(),
        postalCode: address.getPostalCode(),
        city: address.getCity(),
        country: address.getCountry(),
        addressType: address.getAddressType()
      })
    }

    return addressObjects
  }
}
