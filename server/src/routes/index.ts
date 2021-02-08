import cors from 'cors'
import { Router } from 'express'

import GameRouter from './Game'

// Init router and path
const router = Router()

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.APP_URL,
  preflightContinue: false,
}

router.use(cors(options))

// Add sub-routes
router.use('/game', GameRouter)

// Export the base-router
export default router
