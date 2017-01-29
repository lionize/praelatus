import { expect } from 'chai'
import actions, {
  reducer,
  INITIAL_STATE,
  noteSelector,
  notesSelector,
  isFetching,
  error,
} from 'redux/noteRedux'

describe('Note - Redux', () => {
  describe('reducers', () => {
    it('request', () => {
      const state = reducer(INITIAL_STATE, actions.request([0]))

      expect(state.fetching).to.be.true
    })

    it('success', () => {
      const note = {
        id: 0,
        title: 'Note Title',
        body: 'Note Body',
      }
      const state = reducer(INITIAL_STATE, actions.success(note))

      expect(state.ids).to.have.members([0])
      expect(state.byId[0]).to.eq(note)
    })

    it('failure', () => {
      const state = reducer(INITIAL_STATE, actions.failure('Error'))

      expect(state.fetching).to.be.false
      expect(state.error).to.eq('Error')
    })

    it('remove', () => {
      const startingState = INITIAL_STATE.merge({
        ids: [0],
        byId: { 0: { id: 0 } }
      })
      const state = reducer(startingState, actions.remove(0))

      expect(state.ids).to.not.have.members([0])
      expect(state.byId).to.not.have.key(0)
    })
  })

  describe('selectors', () => {
    const noteState = {
      ids: [0, 1],
      byId: {
        0: {
          id: 0,
          title: 'Title',
          body: 'Body',
        },
        1: {
          id: 1,
          title: 'Title',
          body: 'Body',
        }
      },
      fetching: true,
      error: 'Error',
    }

    it('noteSelector', () => {
      expect(noteSelector(noteState, 0)).to.eq(noteState.byId[0])
    })

    it('notesSelector', () => {
      expect(notesSelector(noteState, [0, 1])).to.deep.eq([noteState.byId[0], noteState.byId[1]])
    })

    it('isFetching', () => {
      expect(isFetching(noteState)).to.be.true
    })

    it('error', () => {
      expect(error(noteState)).to.eq('Error')
    })
  })
})
