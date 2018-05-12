import isoFetch from '../../utils/isoFetch'
import { apiUrl } from '../../config.json'

export const searchRecentByPage = async (dispatch, page) => {
  dispatch({ type: 'PHOTO_LOADING' })
  const url = `${apiUrl}&page=${page || 1}`
  try {
    const data = await isoFetch(url)
    dispatch({ type: 'PHOTO_LIST_SUCCESS', data })
  } catch (error) {
    dispatch({ type: 'PHOTO_LIST_ERROR', error })
  }
}
