const isoFetch = require('../../utils/isoFetch')
const { flickrApiUrl } = require('../../config.json')

export const listByPage = (page) => {
  const url = `${flickrApiUrl}&method=flickr.photos.getRecent&page=${page}`
  return isoFetch(url)
}

export const setCurrentPhoto = (id) => {
  const url = `${flickrApiUrl}&method=flickr.photos.getInfo&photo_id=${id}`
  return isoFetch(url)
}
