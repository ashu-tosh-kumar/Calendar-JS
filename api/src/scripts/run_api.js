import { initializer } from '../initializer.js'
import { spawn } from 'child_process'

let cmd = null
if (['production'].includes(initializer.config.ENV)) {
  console.log('Starting the application server')
  cmd = spawn('node', ['api/src/api.js'])
} else {
  console.log('Starting the development application server')
  cmd = spawn('nodemon', ['-L', 'api/src/api.js'])
}

cmd.on('error', (error) => {
  console.log(`Error in running command ${cmd}: ${error.message}`)
})
