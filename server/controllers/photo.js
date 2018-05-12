const isoFetch = require('../../utils/isoFetch')
const { flickrApiUrl } = require('../../config.json')

export const listByPage = (page) => {
  const url = `${flickrApiUrl}&method=flickr.photos.getRecent&page=${page || 1}`
  return isoFetch(url)
}
