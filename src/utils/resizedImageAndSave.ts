import Jimp from 'jimp'

const resizeImageAndSave = async (imageName: string, height: number, width: number) => {
  try {
    const image = await Jimp.read(`./images/${imageName}.png`)
    // save at root level.
    await image
      .resize(width, height)
      .writeAsync(`./resizedImages/${imageName}_${width}_${height}_resized.png`)
    return true
  } catch (err) {
    return false
  }
}

export default resizeImageAndSave
