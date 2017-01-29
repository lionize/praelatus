import { createReducer, createActions } from 'reduxsauce'
import R from 'ramda'
import Immutable from 'seamless-immutable'
import deepMerge from 'utils/deepMerge'

/* TYPES AND ACTION CREATORS */

const { Types, Creators } = createActions({
  request: ['payload'],
  success: ['note'],
  failure: ['error'],
  remove: ['id'],
})

export const noteTypes = Types
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

export const success = (state: Object, { note }: Object) =>
  R.mergeWith(deepMerge, state, {
    fetching: false,
    error: null,
    ids: [note.id],
    byId: { [note.id]: note }
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

/* SELECTORS */

export const noteSelector = (noteState: Object, id: number) => noteState.byId[id]

export const notesSelector = (noteState: Object, ids: ?Array<number>) => {
  let noteIds = noteState.ids

  if (ids) {
    noteIds = noteIds.filter(id => ids.includes(id))
  }

  return noteIds.map(id => noteSelector(noteState, id))
}

export const isFetching = (noteState: Object) => noteState.fetching

export const error = (noteState: Object) => noteState.error
