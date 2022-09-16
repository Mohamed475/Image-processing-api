import Jimp from 'jimp'

const checkIfImageResized = async (imageName: string, height: number, width: number) => {
  try {
    await Jimp.read(`./resizedImages/${imageName}_${width}_${height}_resized.png`)
    return true
  } catch (error) {
    return false
  }
}

export default checkIfImageResized
