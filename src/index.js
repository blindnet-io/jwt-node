const { sign } = require('noble-ed25519')
const { toBase64Url } = require('./util')

class Token {

  constructor(appId, type, expiration, userId) {
    this.appId = appId
    this.type = type
    this.expiration = expiration
    this.userId = userId
  }

  async sign(key) {

    const body = {
      app: this.appId,
      uid: this.userId,
      exp: this.expiration,
    }
    Object.keys(body).forEach(key => body[key] == null && delete body[key])

    const header = { 'alg': 'EdDSA', 'typ': this.type }
    const hb = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(body))}`
    const hb_bytes = new TextEncoder().encode(hb)
    const signature = await sign(hb_bytes, key)
    const b64signature = toBase64Url(signature)

    return `${hb}.${b64signature}`
  }
}

class TokenBuilder {

  constructor(appId, key) {
    this.appId = appId
    this.key = key
    this.expiration = null
  }

  static init(appId, key) {
    const keyBin = Buffer.from(key, 'base64')
    return new TokenBuilder(appId, keyBin)
  }

  expires(exp) {
    this.expiration = exp
    return this
  }

  getExpiration() {
    return this.expiration || Math.floor(Date.now() / 1000) + 3600
  }

  user(userId) {
    const token = new Token(this.appId, 'user', this.getExpiration(), userId)
    return token.sign(this.key)
  }

  app() {
    const token = new Token(this.appId, 'app', this.getExpiration(), null)
    return token.sign(this.key)
  }

  anonymous() {
    const token = new Token(this.appId, 'anon', this.getExpiration(), null)
    return token.sign(this.key)
  }
}

module.exports = TokenBuilder