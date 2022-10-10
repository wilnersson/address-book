import { UserController } from './controller/UserController.js'
import { AddressBook } from './model/domain/AddressBook.js'

/**
 * Main entrypoint of the application.
 */
function start () {
  const addressBook = new AddressBook()
  const userController = new UserController(addressBook)

  userController.startUi()
}

start()
