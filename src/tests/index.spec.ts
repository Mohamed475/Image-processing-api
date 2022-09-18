import supertest from 'supertest'
import app from '../index'

import checkIfImageExists from '../utils/checkIfImageExists'
import checkIfImageResized from '../utils/checkIfImageresized'
import resizeImageAndSave from '../utils/resizedImageAndSave'

// create a request object
const request = supertest(app)

describe('Test image resize endpoint', () => {
  it('success case ✅', async () => {
    const response = await request.get('/api/images/resize?height=300&width=300&imageName=img2')
    expect(response.status).toBe(200)
  })
  it('fail case: missing inputs ❎', async () => {
    const response = await request.get('/api/images/resize?height=300&width=300')
    expect(response.status).toBe(400)
  })
  it('fail case: invalid image name ❎', async () => {
    const response = await request.get(
      '/api/images/resize?height=300&width=300&imageName=invalidImageName'
    )
    expect(response.status).toBe(400)
  })
  it('fail case: invalid height & width ❎', async () => {
    const response = await request.get(
      '/api/images/resize?height=fsdfs&width=-300&imageName=invalidImageName'
    )
    expect(response.status).toBe(400)
  })
})

// Check if image exists
describe('Test checkIfImageExists function', () => {
  it('success case ✅', async () => {
    const result = await checkIfImageExists('img2')
    expect(result).toBe(true)
  })
  it('fail case: invalid image name ❎', async () => {
    const result = await checkIfImageExists('img99')
    expect(result).toBe(false)
  })
})

// Check if image resized
describe('Test checkIfImageResized function', () => {
  it('success case ✅', async () => {
    const result = await checkIfImageResized('img2', 300, 300)
    expect(result).toBe(true)
  })
  it('fail case: image not resized yet ❎', async () => {
    const result = await checkIfImageResized('img1', 300, 300)
    expect(result).toBe(false)
  })
})

// Resize image and save it
describe('Test resizeImageAndSave function', () => {
  it('success case ✅', async () => {
    const result = await resizeImageAndSave('img2', 200, 200)
    expect(result).toBe(true)
  })
  it('fail case: faild to resize image ❎', async () => {
    const result = await resizeImageAndSave('img99', 200, 200)
    expect(result).toBe(false)
  })
})
