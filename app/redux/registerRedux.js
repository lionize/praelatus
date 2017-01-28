import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* TYPES AND ACTION CREATORS */

const { Types, Creators } = createActions({
  request: ['payload'],
  success: ['user'],
  failure: ['error'],
})

export const registerTypes = Types
export default Creators

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
})

/* REDUCERS */

export const request = (state: Object) => state.merge({ fetching: true })

export const success = (state: Object) => state.merge({ fetching: false, error: null })

export const failure = (state: Object, { error }: Object) => state.merge({ fetching: false, error })

/* HOOKUP REDUCERS TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
})
