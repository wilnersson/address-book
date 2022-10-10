/**
 * Represents a physical address.
 */
export class Address {
  #streetName
  #houseNumber
  #postalCode
  #city
  #country
  #addressType

  static #ADDRESS_TYPE_ENUMS = [
    'Home',
    'Work',
    'Temporary'
  ]

  setStreetName (streetName) {
    this.#validateString(streetName)
    this.#streetName = streetName
  }

  getStreetName () {
    return this.#streetName
  }

  setHouseNumber (houseNumber) {
    this.#validateString(houseNumber)
    this.#houseNumber = houseNumber
  }

  getHouseNumber () {
    return this.#houseNumber
  }

  setPostalCode (postalCode) {
    this.#validateString(postalCode)
    this.#postalCode = postalCode
  }

  getPostalCode (postalCode) {
    return this.#postalCode
  }

  setCity (city) {
    this.#validateString(city)
    this.#city = city
  }

  getCity () {
    return this.#city
  }

  setCountry (country) {
    this.#validateString(country)
    this.#country = country
  }

  getCountry () {
    return this.#country
  }

  #validateString (validationString) {
    const error = new TypeError('Must be a string with at least 1 character.')

    if (typeof validationString !== 'string') throw error
    if (validationString.length < 1) throw error
  }

  setAddressType (addressType) {
    this.#validateAddressType(addressType)
    this.#addressType = addressType
  }

  getAddressType () {
    return this.#addressType
  }

  /**
   * @returns {string[]} - an array of strings representing allowed address types.
   */
  static getAddressTypeEnums () {
    return Array.from(Address.#ADDRESS_TYPE_ENUMS)
  }

  #validateAddressType (addressType) {
    if (!Address.#ADDRESS_TYPE_ENUMS.includes(addressType)) {
      throw new TypeError('addressType must be one of Address.getAddressTypeEnums().')
    }
  }
}
