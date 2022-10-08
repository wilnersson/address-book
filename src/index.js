import { User } from './controller/User.js'
import { AddressBook } from './model/domain/AddressBook.js'

/**
 * Main entrypoint of the application.
 */
function start () {
  const addressBook = new AddressBook()
  const userController = new User(addressBook)

  userController.startUi()
}

start()
