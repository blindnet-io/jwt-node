function toBase64Url(arr) {
  function escape(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  return escape(toBase64(arr))
}

function toBase64(arr) {
  return Buffer.from(arr).toString('base64')
}

module.exports = {
  toBase64Url,
  toBase64
}