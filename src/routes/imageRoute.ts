import express from 'express'
import imageProcessingController from '../controllers/imageProcessing'

const router = express.Router()

router.get('/resize', imageProcessingController)

export default router
