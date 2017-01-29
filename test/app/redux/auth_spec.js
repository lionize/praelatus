import { expect } from 'chai'
import actions, { reducer, INITIAL_STATE } from 'app/redux/authRedux'

describe('Auth - Redux', () => {
  it('loginRequest', () => {
    const state = reducer(INITIAL_STATE, actions.loginRequest('username', 'password'))

    expect(state.fetching).to.be.true
  })

  it('loginSuccess', () => {
    const state = reducer(INITIAL_STATE, actions.loginSuccess(0))

    expect(state.fetching).to.be.false
    expect(state.currentUser).to.eq(0)
  })

  it('loginFailure', () => {
    const state = reducer(INITIAL_STATE, actions.loginFailure('Error'))

    expect(state.fetching).to.be.false
    expect(state.error).to.eq('Error')
  })

  it('logout', () => {
    const state = reducer(INITIAL_STATE, actions.logout())

    expect(state).to.deep.eq(INITIAL_STATE)
  })

  it('registerRequest', () => {
    const state = reducer(INITIAL_STATE, actions.registerRequest({}))

    expect(state.fetching).to.be.true
  })

  it('registerSuccess', () => {
    const state = reducer(INITIAL_STATE, actions.registerSuccess({}))

    expect(state.fetching).to.be.false
  })

  it('registerFailure', () => {
    const state = reducer(INITIAL_STATE, actions.registerFailure('Error'))

    expect(state.fetching).to.be.false
    expect(state.error).to.eq('Error')
  })
})
