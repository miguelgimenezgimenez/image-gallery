import isoFetch from '../../utils/isoFetch'
import { apiUrl } from '../../config.json'

export const searchNextPage = async (dispatch, page) => {
  dispatch({ type: 'PHOTO_LIST_LOADING' })
  const url = `${apiUrl}/photo?page=${page || 1}`
  try {
    const data = await isoFetch(url)
    dispatch({ type: 'PHOTO_NEXT_PAGE_SUCCESS', data })
  } catch (error) {
    dispatch({ type: 'PHOTO_ERROR', error })
  }
}
export const setCurrentPhoto = async (dispatch, id) => {
  dispatch({ type: 'PHOTO_INFO_LOADING' })
  const url = `${apiUrl}/photo/${id}`
  try {
    const data = await isoFetch(url)
    dispatch({ type: 'SET_CURRENT_PHOTO', data })
  } catch (error) {
    dispatch({ type: 'PHOTO_ERROR', error })
  }
}

export const toggleModal = (dispatch, modalOpen) => {
  dispatch({ type: 'TOGGLE_MODAL', modalOpen })
}
