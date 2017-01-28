import { expect } from 'chai'
import actions, { reducer, INITIAL_STATE } from 'app/redux/userRedux'

describe('User - Redux', () => {
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
