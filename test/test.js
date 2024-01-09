import { describe, it } from '../src/core.mjs'

it('First it', () => {
  console.log('Inside first it')
})

it('Second it', () => {
  console.log('Inside second it')
  // throw new Error('Error fail test')
})

it('Third it', () => {
  console.log('Inside third it')
})

describe('First describe', () => {
  console.log('Inside first describe')
  it('First it inside first describe', () => {
    console.log('First it inside first describe')
    // throw new Error('Error fail test')
  })
})
