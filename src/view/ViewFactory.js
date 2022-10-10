import { AddressView } from './AddressView.js'
import { ContactView } from './ContactView.js'
import { MainView } from './MainView.js'

export class ViewFactory {
  getMainView () {
    return new MainView()
  }

  getContactView () {
    return new ContactView()
  }

  getAddressView () {
    return new AddressView()
  }
}
