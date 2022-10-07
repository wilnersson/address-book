/**
 * Main entrypoint of the application.
 */

import collector from '@wilnersson/console-input-collector'

async function start () {
  const answer = await collector.requestStringInput('First test of my package! How are you?')
  console.log('Wohoo! Your answer was: ' + answer)
}

start()
