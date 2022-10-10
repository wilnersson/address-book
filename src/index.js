import { UserController } from './controller/UserController.js'
import { AddressBook } from './model/domain/AddressBook.js'
import { ViewFactory } from './view/ViewFactory.js'

/**
 * Main entrypoint of the application.
 */
function start () {
  const addressBook = new AddressBook()
  const viewFactory = new ViewFactory()
  const userController = new UserController(addressBook, viewFactory)

  userController.startUi()
}

start()
