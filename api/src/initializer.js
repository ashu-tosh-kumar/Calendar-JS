import express from 'express'
import { config } from './config.js'

// ----------------------------------------------------------
// Express application setup
const app = express()

export const initializer = {
  app,
  config
}
