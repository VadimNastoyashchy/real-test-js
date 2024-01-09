import { it } from '../src/runner.mjs'

it('First pass test', () => {
  console.log('Pass test')
})

it('First fail test', () => {
  console.log('Fail test')
  throw new Error('Error fail test')
})
