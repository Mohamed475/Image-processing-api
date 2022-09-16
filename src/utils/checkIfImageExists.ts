import Jimp from 'jimp'

const checkIfImageExists = async (imageName: string) => {
  try {
    await Jimp.read(`./images/${imageName}.png`)
    return true
  } catch (error) {
    return false
  }
}

export default checkIfImageExists
