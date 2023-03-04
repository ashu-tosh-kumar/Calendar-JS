import app from './initializer'
import { exceptions } from './exceptions.js'
import { getDateMatrix } from './get_date_matrix.js'

const port = 8000

/**
* Home end point
* @param req - Request object in API
* @param res - response object in API
* @return {string} Returns string message
*/
app.get('/', (_, res) => {
  console.debug('Home GET end point called')

  res.send("Welcome to Calendar App. Please visit url: 'hostname:port/date' to try it.")
})

/**
* Health end point
* @param req - Request object in API
* @param res - response object in API
* @return {string} Returns string message
*/
app.get('/health', (_, res) => {
  console.debug('Health GET end point called')

  res.send('Calendar App alive.')
})

/**
* Date route of the application
* @param req - Request object in API
* @param res - response object in API
* @return Returns date matrix
*/
app.get('/:date', (req, res) => {
  const date = req.params.date
  console.info(`GET call received to get date for: ${date}`)

  try {
    const dateMatrix = getDateMatrix(date)
    res.status(200)
    return res.send(dateMatrix)
  } catch (error) {
    if (error instanceof exceptions.InvalidDateFormat) {
      console.info('Date validation failed')
      res.status(400)
      return res.send(error.message)
    } else {
      console.error('Server side error. Please reach out to support team for help')
      res.status(500)
      return res.send('Server side issue')
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
