/* eslint-disable indent */
import { AssertionError } from './assertionError.mjs'
import * as assertions from './assertions.mjs'

const matcherHandler = (actual) => ({
  get:
    (_, name) =>
    (...args) => {
      try {
        assertions[name](actual, ...args)
      } catch (e) {
        if (e instanceof AssertionError) {
          currentTest.errors.push(e)
        } else {
          throw e
        }
      }
    },
})

export const expect = (actual) => new Proxy({}, matcherHandler(actual))
