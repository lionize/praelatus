import { createReducer, createActions } from 'reduxsauce'
import R from 'ramda'
import Immutable from 'seamless-immutable'
import deepMerge from 'app/utils/deepMerge'

/* TYPES AND ACTION CREATORS */

const { Types, Creators } = createActions({
  request: ['username', 'password'],
  success: ['id'],
  failure: ['error'],
  logout: null,
})

export const loginTypes = Types
export default Creators

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  currentUser: null,
  error: null,
  fetching: false,
})

/* REDUCERS */

export const request = (state: Object) => state.merge({ fetching: true })

export const success = (state: Object, { id }: Object) => state.merge({ fetching: false, error: null, currentUser: id })

export const failure = (state: Object, { error }: Object) => state.merge({ fetching: false, error })

export const logout = (state: Object) => INITIAL_STATE

/* HOOKUP REDUCERS TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.LOGOUT]: logout,
})

