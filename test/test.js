import { it } from '../src/core.mjs'

it('First pass test', () => {
  console.log('Inside First pass test (it)')
})

it('First fail test', () => {
  console.log('Inside First fail test (it)')
  throw new Error('Error fail test')
})
