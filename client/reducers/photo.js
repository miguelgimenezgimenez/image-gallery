import _ from 'lodash'

const INITIAL_STATE = {
  error: null,
  list: [],
  loading: false,
  currentPhoto: {
    username: '',
    location: '',
    date: '',
    title: ''
  },
  currentPage: 1
}
const setError = (state, error) => ({ ...state,
  error,
  loading: false
})

const setLoading = (state, loading) => ({ ...state,
  loading
})

const setPhotoList = (state, data) => {
  const newPhotos = _.get(data, 'photos.photo', [])
  const list = [...state.list].concat(newPhotos)
  return { ...state,
    list,
    loading: false,
    currentPage: state.currentPage + 1
  }
}
const setCurrentPhoto = (state, currentPhoto) => {
  const username = _.get(currentPhoto, 'owner.username', '')
  const date = _.get(currentPhoto, 'dates.taken', '')
  const location = _.get(currentPhoto, 'owner.location', '')
  const title = _.get(currentPhoto, 'title._content', '')
  return { ...state,
    currentPhoto: { username, location, title, date },
    loading: false }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PHOTO_LOADING':
      return setLoading(state, true)
    case 'PHOTO_NEXT_PAGE_SUCCESS':
      return setPhotoList(state, action.data)
    case 'PHOTO_INFO_SUCCESS':
      return setCurrentPhoto(state, action.data.photo)
    case 'PHOTO_ERROR':
      return setError(state, action.error)

    default:
      return state
  }
}
