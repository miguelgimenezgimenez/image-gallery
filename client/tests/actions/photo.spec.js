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
  beforeEach(() => {
    fetch.resetMocks()
  })
  describe('listForLetter', () => {
    it('dispatches PHOTO_LIST_LOADING and PHOTO_NEXT_PAGE_SUCCESS actions with correct output data', () => {
      const store = mockStore(INITIAL_STATE)

      fetch.mockResponses([JSON.stringify([1, 2, 3, 4])])

      return photoActions.searchNextPage(store.dispatch, 1).then((res) => {
        fetch.mock.calls.length.should.equal(1)
        store.getActions()[0].type.should.equal('PHOTO_LIST_LOADING')
        store.getActions()[1].type.should.equal('PHOTO_NEXT_PAGE_SUCCESS')
        store.getActions()[1].data.body.should.deep.equal('[1,2,3,4]')
      })
    })
    describe('setCurrenPhoto', () => {
      it('dispatches loading and add PHOTO_NEXT_PAGE_SUCCESS actions with correct output data', () => {
        const store = mockStore(INITIAL_STATE)

        fetch.mockResponses([JSON.stringify({
          username: 'miguel',
          id: 1234
        })])

        return photoActions.setCurrentPhoto(store.dispatch, '1234').then((res) => {
          fetch.mock.calls.length.should.equal(1)
          store.getActions()[0].type.should.equal('PHOTO_INFO_LOADING')
          store.getActions()[1].type.should.equal('SET_CURRENT_PHOTO')
          store.getActions()[1].data.body.should.deep.equal('{"username":"miguel","id":1234}')
        })
      })
    })
  })
})
