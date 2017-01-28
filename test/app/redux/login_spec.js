import { expect } from 'chai'
import actions, { reducer, INITIAL_STATE } from 'app/redux/loginRedux'

describe('Login - Redux', () => {
  it('request', () => {
    const state = reducer(INITIAL_STATE, actions.request('username', 'password'))

    expect(state.fetching).to.be.true
  })

  it('success', () => {
    const state = reducer(INITIAL_STATE, actions.success(0))

    expect(state.fetching).to.be.false
    expect(state.currentUser).to.eq(0)
  })

  it('failure', () => {
    const state = reducer(INITIAL_STATE, actions.failure('Error'))

    expect(state.fetching).to.be.false
    expect(state.error).to.eq('Error')
  })

  it('logout', () => {
    const state = reducer(INITIAL_STATE, actions.logout())

    expect(state).to.deep.eq(INITIAL_STATE)
  })
})
