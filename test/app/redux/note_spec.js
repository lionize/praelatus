import { expect } from 'chai'
import actions, { reducer, INITIAL_STATE } from 'app/redux/userRedux'

describe('Note - Redux', () => {
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
