import { expect } from 'chai'
import actions, {
  reducer,
  INITIAL_STATE ,
  userSelector,
  usersSelector,
  isFetching,
  error,
} from 'redux/userRedux'

describe('User - Redux', () => {
  describe('reducers', () => {
    it('request', () => {
      const state = reducer(INITIAL_STATE, actions.request([0]))

      expect(state.fetching).to.be.true
    })

    it('success', () => {
      const user = {
        id: 0,
        name: 'Test Testerson',
        email: 'test@testerson.com',
      }
      const state = reducer(INITIAL_STATE, actions.success(user))

      expect(state.ids).to.have.members([0])
      expect(state.byId[0]).to.eq(user)
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
    const userState = {
      ids: [0, 1],
      byId: {
        0: {
          id: 0,
          name: 'Test Testerson',
          email: 'test@testerson.com',
        },
        1: {
          id: 1,
          name: 'Test Testerson II',
          email: 'testthesecond@testerson.com',
        }
      },
      fetching: true,
      error: 'Error',
    }

    it('userSelector', () => {
      expect(userSelector(userState, 0)).to.eq(userState.byId[0])
    })

    it('usersSelector', () => {
      expect(usersSelector(userState, [0, 1])).to.deep.eq([userState.byId[0], userState.byId[1]])
    })

    it('isFetching', () => {
      expect(isFetching(userState)).to.be.true
    })

    it('error', () => {
      expect(error(userState)).to.eq('Error')
    })
  })
})
