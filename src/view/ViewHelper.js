/**
 * Supplies useful helper methods for the view.
 */
export class ViewHelper {
  alertUser (message) {
    console.log(message + '\n')
  }

  clearConsole () {
    console.clear()
  }

  printEmptyLine () {
    console.log()
  }

  printHeader (header) {
    console.log('--- ' + header + ' ---')
  }
}
