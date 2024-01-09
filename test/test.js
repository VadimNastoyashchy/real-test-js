import { describe, it } from '../src/core.mjs'

it('First it', () => {
  console.log('1')
})

describe('First describe', () => {
  console.log('2')
  it('First it inside first describe', () => {
    console.log('3')
    // throw new Error('Error fail test')
  })
})

describe('Second describe', () => {
  console.log('4')
  describe('Inside second describe > nested describe', () => {
    console.log('5')
    it('First it inside nested describe', () => {
      console.log('6')
      // throw new Error('Error fail test')
    })
  })
})
