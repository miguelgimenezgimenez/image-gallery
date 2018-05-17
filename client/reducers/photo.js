import _ from 'lodash'

const INITIAL_STATE = {
  error: null,
  list: [],
  infoLoading: false,
  listLoading: false,
  currentPhoto: {
    username: '',
    location: '',
    date: '',
    title: '',
    imageUrl: ''
  },
  modalOpen: false,
  currentPage: 1
}
const setError = (state, error) => ({ ...state,
  error,
  loading: false
})

const setLoading = (state, type, loading) => ({ ...state,
  [type]: loading
})

const setPhotoList = (state, data) => {
  const newPhotos = _.get(data, 'photos.photo', [])
  const list = [...state.list].concat(newPhotos)
  return { ...state,
    list,
    listLoading: false,
    currentPage: state.currentPage + 1
  }
}
const toggleModal = (state, modalOpen) => ({ ...state, modalOpen: !state.modalOpen })

const setCurrentPhoto = (state, currentPhoto) => {
  // eslint-disable-next-line
  const imageUrl = `https://farm${currentPhoto.farm}.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}.jpg`

  const username = _.get(currentPhoto, 'owner.username', '')
  const date = _.get(currentPhoto, 'dates.taken', '')
  const location = _.get(currentPhoto, 'owner.location', '')
  const title = _.get(currentPhoto, 'title._content', '')
  return { ...state,
    currentPhoto: { username, location, title, date, imageUrl },
    infoLoading: false }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PHOTO_INFO_LOADING':
      return setLoading(state, 'infoLoading', true)
    case 'PHOTO_LIST_LOADING':
      return setLoading(state, 'listLoading', true)
    case 'PHOTO_NEXT_PAGE_SUCCESS':
      return setPhotoList(state, action.data)
    case 'SET_CURRENT_PHOTO':
      return setCurrentPhoto(state, action.data.photo)
    case 'PHOTO_ERROR':
      return setError(state, action.error)
    case 'TOGGLE_MODAL':
      return toggleModal(state, action.error)

    default:
      return state
  }
}
