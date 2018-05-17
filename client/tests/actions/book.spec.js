/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import configureMockStore from 'redux-mock-store'
import chai from 'chai'
import fetchMock from 'fetch-mock'
import * as bookActions from '../../actions/book'

const mockStore = configureMockStore()

chai.should()

const INITIAL_STATE = {
  error: null,
  list: {},
  loading: false,
  current: {}

}

describe.only('Book Actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  const bookList = [{ name: 'book1' }, { name: 'book2' }, { name: 'book3' }, { name: 'book4' }]

  describe('getBook', () => {
    const store = mockStore(INITIAL_STATE)

    it('dispatches loading and add actions with correct output data', () => {
      fetchMock.get('http://localhost:5050/book?title=HarryPotter', bookList[0])
      const expectedActions = [
        { type: 'BOOK_LOADING' },
        { type: 'BOOK_CURRENT_SUCCESS', data: bookList[0] }
      ]

      return bookActions.getBook(store.dispatch, 'HarryPotter').then((res) => {
        store.getActions().should.deep.equal(expectedActions)
      })
    })
  })

  describe('listForLetter', () => {
    const store = mockStore(INITIAL_STATE)

    it('dispatches loading and add actions with correct output data', () => {
      fetchMock.get('http://localhost:5050/book/list?letter=A', bookList)
      const expectedActions = [
        { type: 'BOOK_LOADING' },
        { type: 'BOOK_LIST_SUCCESS', data: bookList }
      ]

      return bookActions.listForLetter(store.dispatch, 'A').then((res) => {
        store.getActions().should.deep.equal(expectedActions)
      })
    })
  })
  describe('listForAuthor', () => {
    const store = mockStore(INITIAL_STATE)

    it('dispatches loading and add actions with correct output data', () => {
      fetchMock.get('http://localhost:5050/book/authorList?author=StephenKing', bookList)
      const expectedActions = [
        { type: 'BOOK_LOADING' },
        { type: 'BOOK_LIST_SUCCESS', data: bookList }
      ]

      return bookActions.listForAuthor(store.dispatch, 'StephenKing').then((res) => {
        store.getActions().should.deep.equal(expectedActions)
      })
    })
  })
  describe('listForGenre', () => {
    const store = mockStore(INITIAL_STATE)

    it('dispatches loading and add actions with correct output data', () => {
      fetchMock.get('http://localhost:5050/book/genreList?genre=terror', bookList)
      const expectedActions = [
        { type: 'BOOK_LOADING' },
        { type: 'BOOK_LIST_SUCCESS', data: bookList }
      ]

      return bookActions.listForGenre(store.dispatch, 'terror').then((res) => {
        store.getActions().should.deep.equal(expectedActions)
      })
    })
  })
})
