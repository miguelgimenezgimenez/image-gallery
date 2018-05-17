const fetch = require('isomorphic-fetch')
const fetchMock = require('jest-fetch-mock')

require('babel-polyfill') // For old browsers

const isoFetch = async (url) => {
  const raw = await fetch(url)
  const json = await raw.json()
  if (json.stat !== 'ok') throw new Error(json)
  return json
}

module.exports = process.env.NODE_ENV === 'test' ? fetchMock : isoFetch
