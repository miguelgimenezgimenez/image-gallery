const fetch = require('isomorphic-fetch')
require('babel-polyfill') // For old browsers

const isoFetch = async (url) => {
  const raw = await fetch(url)
  const json = await raw.json()
  if (json.stat !== 'ok') throw new Error(json)
  return json
}

module.exports = isoFetch
