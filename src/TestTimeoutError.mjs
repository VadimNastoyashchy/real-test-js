/* eslint-disable promise/param-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-promise-reject-errors */
export class TestTimeoutError extends Error {
  constructor(timeout) {
    super(`Test timed out after ${timeout}ms`)
    this.timeout = timeout
  }

  createTimeoutPromise() {
    return new Promise((_, reject) =>
      setTimeout(() => reject(this), this.timeout)
    )
  }
}
