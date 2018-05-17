/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import configureMockStore from 'redux-mock-store'
import chai from 'chai'
import fetchMock from 'fetch-mock'
import * as photoActions from '../../actions/photo'

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

describe.only('Author Actions', () => {
  describe('listForLetter', () => {
    const store = mockStore(INITIAL_STATE)

    it('dispatches loading and add actions with correct output data', () => {
      fetch.mockResponse(JSON.stringify({
        access_token: '12345'
      }))

      const expectedActions = [{
        type: 'PHOTO_INFO_LOADING'
      },
      {
        type: 'PHOTO_NEXT_PAGE_SUCCESS',
        data: [1, 2, 3]
      }
      ]

      return photoActions.searchNextPage(store.dispatch, 1).then((res) => {
        console.log(store.getActions())
        store.getActions().should.deep.equal(expectedActions)
      })
    })
  })
})
