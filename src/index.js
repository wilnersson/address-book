import { UserController } from './controller/UserController.js'
import { AddressBook } from './model/domain/AddressBook.js'
import { ViewFactory } from './view/ViewFactory.js'

/**
 * Main entrypoint of the application.
 */
async function start () {
  const addressBook = new AddressBook()
  await addressBook.loadContactsFromPersistence()
  const viewFactory = new ViewFactory()
  const userController = new UserController(addressBook, viewFactory)

  userController.startUi()
}

start()
