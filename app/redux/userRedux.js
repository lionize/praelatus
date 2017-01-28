import { createReducer, createActions } from 'reduxsauce'
import R from 'ramda'
import Immutable from 'seamless-immutable'
import deepMerge from 'app/utils/deepMerge'

/* TYPES AND ACTION CREATORS */
const { Types, Creators } = createActions({
  request: ['payload'],
  success: ['user'],
  failure: ['error'],
  remove: ['id'],
})

export const userTypes = Types
export default Creators

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  byId: {},
  ids: [],
  error: null,
  fetching: false,
})

/* REDUCERS */

export const request = (state: Object) => state.merge({ fetching: true })

export const success = (state: Object, { user }: Object) =>
   R.mergeWith(deepMerge, state, {
    fetching: false,
    error: null,
    ids: [user.id],
    byId: { [user.id]: user }
  })

export const failure = (state: Object, { error }: Object) => state.merge({ fetching: false, error })

export const remove = (state: Object, { id }: Object) =>
  state.merge({
    ids: state.ids.filter(i => i !== id),
    byId: state.byId.without(id)
  })

/* HOOKUP REDUCERS TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.REMOVE]: remove,
})
