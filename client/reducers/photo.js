import _ from 'lodash'

const INITIAL_STATE = {
  error: null,
  list: [],
  loading: false,
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

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PHOTO_LOADING':
      return setLoading(state, true)
    case 'PHOTO_NEXT_PAGE_SUCCESS':
      return setPhotoList(state, action.data)
    case 'PHOTO_ERROR':
      return setError(state, action.error)

    default:
      return state
  }
}
