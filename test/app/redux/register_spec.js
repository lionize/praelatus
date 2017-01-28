import { expect } from 'chai'
import actions, { reducer, INITIAL_STATE } from 'app/redux/registerRedux'

describe('Register - Redux', () => {
  it('request', () => {
    const state = reducer(INITIAL_STATE, actions.request({}))

    expect(state.fetching).to.be.true
  })

  it('success', () => {
    const state = reducer(INITIAL_STATE, actions.success({}))

    expect(state.fetching).to.be.false
  })

  it('failure', () => {
    const state = reducer(INITIAL_STATE, actions.failure('Error'))

    expect(state.fetching).to.be.false
    expect(state.error).to.eq('Error')
  })
})
