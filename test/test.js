const { describe, it } = require('mocha')
const assert = require('assert')
const TokenBuilder = require('../src/index')
const { toBase64Url, toBase64 } = require('../src/util')

describe('toBase64', function () {
  it('should encode a byte array to Base64', function () {
    const arr = new Uint8Array(Array.from(Array(34).keys()))
    assert.equal(
      toBase64(arr),
      'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gIQ=='
    )
  })
})

describe('toBase64Url', function () {
  it('should encode a byte array to Base64Url', function () {
    const arr = new Uint8Array(Array.from(Array(34).keys()))
    assert.equal(
      toBase64Url(arr),
      'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gIQ'
    )
  })
})

const app = 'test_app'

const key = [
  194, 94, 44, 180, 205, 46, 57, 203,
  75, 47, 38, 25, 76, 123, 105, 8,
  182, 83, 33, 37, 38, 162, 121, 17,
  55, 2, 32, 236, 240, 189, 149, 15
]
const encodedKey = toBase64(key)

describe('TokenBuilder', function () {
  it('should create a correct application key', function () {
    const token = TokenBuilder.init(app, encodedKey).expires(100)

    return token.app().then(t =>
      assert.equal(
        t,
        'eyJhbGciOiJFZERTQSIsInR5cCI6ImFwcCJ9.eyJhcHAiOiJ0ZXN0X2FwcCIsImV4cCI6MTAwfQ.FQGrxRdT4lH_wQZtTXptMJH6ASTgZp56LzkL6ZPcTPf2dV-tlCS1qWbXjTT3zrVZ7XW8j8Gf--8h5a_BHbyUDg'
      )
    )

  })
})

describe('TokenBuilder', function () {
  it('should create a correct user key', function () {
    const token = TokenBuilder.init(app, encodedKey).expires(100)

    return token.user('test_user').then(t =>
      assert.equal(
        t,
        'eyJhbGciOiJFZERTQSIsInR5cCI6InVzZXIifQ.eyJhcHAiOiJ0ZXN0X2FwcCIsInVpZCI6InRlc3RfdXNlciIsImV4cCI6MTAwfQ.wIPHKzIXsYSG03oiv-L702kbXYGLBFXZWcuX0JMWIl2p_WQr-kZE8uglrRC5LIjgcuGwIvYadaW6nNj5edDgDA'
      )
    )

  })
})

describe('TokenBuilder', function () {
  it('should create a correct anonymous key', function () {
    const token = TokenBuilder.init(app, encodedKey).expires(100)

    return token.anonymous().then(t =>
      assert.equal(
        t,
        'eyJhbGciOiJFZERTQSIsInR5cCI6ImFub24ifQ.eyJhcHAiOiJ0ZXN0X2FwcCIsImV4cCI6MTAwfQ._LaTmheyuI5E5St5oGQf9qyxRFIS1j14yuOzrItcSWRcK8vxdP_VgVvrjPsmOvqfTpta61qq-Ok3YkXK-Ie8CQ'
      )
    )

  })
})