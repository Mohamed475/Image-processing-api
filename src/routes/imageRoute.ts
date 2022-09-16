import express, { Application, Request, Response } from 'express'
import imageProcessingController from '../controllers/imageProcessing'

const router = express.Router()

router.get('/resize', imageProcessingController)

export default router
