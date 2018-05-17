/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import configureMockStore from 'redux-mock-store'
import chai from 'chai'
import authorReducer from '../../reducers/photo'

const mockStore = configureMockStore()

chai.should()
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

describe.only('Photo Reducer', () => {
  const photoList = ['Ken Follet', 'Kim Basinger', 'Kin Kong']

  describe('PHOTO_NEXT_PAGE_SUCCESS', () => {
    const store = mockStore(INITIAL_STATE)
    it('should handle PHOTO_NEXT_PAGE_SUCCESS', () => {
      const updatedState = { ...INITIAL_STATE, list: photoList, currentPage: 2 }

      authorReducer(
        undefined,
        { type: 'PHOTO_NEXT_PAGE_SUCCESS',
          data: { photos: { photo: photoList } } }

      ).should.deep.equal(updatedState)
    })
  })
  describe('SET_CURRENT_PHOTO', () => {
    const store = mockStore(INITIAL_STATE)
    const currentPhoto = {
      username: 'miguel',
      location: 'barcelona',
      date: '8 may',
      title: 'motox',
      imageUrl: `https://farm1.staticflickr.com/2/123_ktm250.jpg`
    }
    const data = {
      photo: {
        owner: {
          username: 'miguel',
          location: 'barcelona'
        },
        dates: {
          taken: '8 may'
        },
        title: {
          _content: 'motox'
        },
        farm: '1',
        id: '123',
        server: '2',
        secret: 'ktm250'
      }
    }
    it('should handle SET_CURRENT_PHOTO', () => {
      const updatedState = { ...INITIAL_STATE, currentPhoto }
      authorReducer(
        undefined,
        { type: 'SET_CURRENT_PHOTO',
          data }
      ).should.deep.equal(updatedState)
    })
  })
})

//   it('should append items to the list', () => {
//     const firstState = { ...INITIAL_STATE, list: { P: authorList } }
//     const updatedState = { ...INITIAL_STATE, list: { P: authorList, D: authorListD } }
//     authorReducer(firstState, { type: 'AUTHOR_LIST_SUCCESS', data: dataD }).should.deep.equal(updatedState)
//   })

//   it('should handle error', () => {
//     const error = 'fetch error'
//     const updatedState = { ...INITIAL_STATE, error }
//     authorReducer(undefined, { type: 'AUTHOR_LIST_ERROR', error }).should.deep.equal(updatedState)
//   })
// })
// })
