import collector from '@wilnersson/console-input-collector'
import { Address } from '../model/domain/Address.js'
import { ViewHelper } from './ViewHelper.js'

export class AddressView {
  #lastCreatedAddress

  #viewHelper

  constructor () {
    this.#viewHelper = new ViewHelper()
  }

  async printAddAddressPage () {
    this.#viewHelper.clearConsole()
    this.#viewHelper.printHeader('Add new address')
    await this.#collectNewAddressInformation()
  }

  async #collectNewAddressInformation () {
    const newAddress = new Address()
    await this.#collectAddressType(newAddress)
    await this.#collectAddressStreetName(newAddress)
    await this.#collectAddressHouseNumber(newAddress)
    await this.#collectAddressPostalCode(newAddress)
    await this.#collectAddressCity(newAddress)
    await this.#collectAddressCountry(newAddress)
    this.#lastCreatedAddress = newAddress
  }

  async #collectAddressType (address) {
    try {
      const addressType = await collector.requestSingleChoiceInput('Address type:', Address.getAddressTypeEnums())
      address.setAddressType(addressType.choiceText)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.#collectAddressType(address)
    }
  }

  async #collectAddressStreetName (address) {
    try {
      const streetName = await collector.requestStringInput('Street name:')
      address.setStreetName(streetName)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.#collectAddressStreetName(address)
    }
  }

  async #collectAddressHouseNumber (address) {
    try {
      const houseNumber = await collector.requestStringInput('House number:')
      address.setHouseNumber(houseNumber)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.#collectAddressHouseNumber(address)
    }
  }

  async #collectAddressPostalCode (address) {
    try {
      const postalCode = await collector.requestStringInput('Postal code:')
      address.setPostalCode(postalCode)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.#collectAddressPostalCode(address)
    }
  }

  async #collectAddressCity (address) {
    try {
      const city = await collector.requestStringInput('City:')
      address.setCity(city)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.#collectAddressCity(address)
    }
  }

  async #collectAddressCountry (address) {
    try {
      const country = await collector.requestStringInput('Country:')
      address.setCountry(country)
    } catch (error) {
      this.#viewHelper.alertUser(error.message)
      await this.#collectAddressCountry(address)
    }
  }

  getLastCreatedAddress () {
    return this.#lastCreatedAddress
  }
}
