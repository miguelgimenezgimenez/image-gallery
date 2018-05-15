const fetch = require('isomorphic-fetch')
require('babel-polyfill')

const isoFetch = async (url) => {
  const raw = await fetch(url)
  const json = await raw.json()
  if (json.stat !== 'ok') {
    console.log(json)
    // throw new Error(json)
  }
  // if (json.stat !== 'ok') throw new Error(json)
  return json
}

module.exports = isoFetch
