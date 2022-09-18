import { Request, Response } from 'express'
import path from 'path'
import checkIfImageExists from '../utils/checkIfImageExists'
import checkIfImageResized from '../utils/checkIfImageresized'
import resizeImageAndSave from '../utils/resizedImageAndSave'

const imageProcessingController = async (req: Request, res: Response) => {
  // Get height & width & imageName from query params
  const height = req.query.height
  const width = req.query.width
  const imageName = req.query.imageName

  // Validate height and width to be only numbers
  if (isNaN(Number(height)) || isNaN(Number(width))) {
    return res.status(400).send('Height and Width must be only numbers')
  }

  // Validate imageName to be a string
  if (typeof imageName !== 'string') {
    return res.status(400).send('Image name must be a string')
  }

  // Validate height and width to be positive numbers
  if (Number(height) < 0 || Number(width) < 0) {
    return res.status(400).send('Height and Width must be positive numbers')
  }

  // Validate inputs
  if (!height || !width || !imageName) {
    return res.status(400).send('Missing parameters, required: height, width, imageName')
  }

  // Check if image exists
  let isImageExists
  try {
    isImageExists = await checkIfImageExists(imageName.toString())
  } catch (err) {
    return res.status(500).send('Something went wrong please try again!')
  }
  if (!isImageExists) {
    return res.status(400).send('Image does not exist, please enter a valid image name!')
  }

  // For cashing
  // Check if image allready resized
  let isImageResized
  try {
    isImageResized = await checkIfImageResized(imageName.toString(), +width, +height)
  } catch (err) {
    return res.status(400).send('Image does not exist, please enter a valid image name!')
  }

  let imageResizedAndSaved = false
  if (!isImageResized) {
    // Resize image and save it
    try {
      imageResizedAndSaved = await resizeImageAndSave(imageName.toString(), +height, +width)
    } catch (err) {
      return res.status(500).send('Something went wrong please try again!')
    }
  }

  // Resized image path
  // Get the absolute path of the resized image
  const resizedImagePath = path.join(
    __dirname,
    `../../resizedImages/${imageName}_${width}_${height}_resized.png`
  )

  if (imageResizedAndSaved || isImageResized) {
    // Success
    return res.status(200).sendFile(resizedImagePath)
  } else {
    // Faild
    return res.status(500).send('Something went wrong please try again!')
  }
}

export default imageProcessingController
