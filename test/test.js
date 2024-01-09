import { describe, it } from '../src/core.mjs'

it('First it', () => {
  console.log('Inside first it')
})

it('Second it', () => {
  console.log('Inside second it')
  // throw new Error('Error fail test')
})

describe('First describe', () => {
  console.log('Inside first describe')
})
