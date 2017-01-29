import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* TYPES AND ACTION CREATORS */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['id'],
  loginFailure: ['error'],
  logout: null,
  registerRequest: ['payload'],
  registerSuccess: ['user'],
  registerFailure: ['error'],
})

export const authTypes = Types
export default Creators

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  currentUser: null,
  error: null,
  fetching: false,
})

/* REDUCERS */

export const loginRequest = (state: Object) => state.merge({ fetching: true })

export const loginSuccess = (state: Object, { id }: Object) =>
  state.merge({ fetching: false, error: null, currentUser: id })

export const loginFailure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

export const logout = () => INITIAL_STATE

export const registerRequest = (state: Object) => state.merge({ fetching: true })

export const registerSuccess = (state: Object) => state.merge({ fetching: false, error: null })

export const registerFailure = (state: Object, { error }: Object) => state.merge({ fetching: false, error })

/* HOOKUP REDUCERS TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
})

