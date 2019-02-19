/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const UPDATE_TITLE = 'UPDATE_TITLE'

export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {
  page: string
}
export interface AppActionUpdateOffline extends Action<'UPDATE_OFFLINE'> {
  offline: boolean
}
export interface AppActionUpdateDrawerState
  extends Action<'UPDATE_DRAWER_STATE'> {
  opened: boolean
}
export interface AppActionUpdateTitle extends Action<'UPDATE_TITLE'> {
  title: string
}
export interface AppActionOpenSnackbar extends Action<'OPEN_SNACKBAR'> {}
export interface AppActionCloseSnackbar extends Action<'CLOSE_SNACKBAR'> {}
export type AppAction =
  | AppActionUpdatePage
  | AppActionUpdateOffline
  | AppActionUpdateDrawerState
  | AppActionOpenSnackbar
  | AppActionCloseSnackbar
  | AppActionUpdateTitle

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>

export const navigate: ActionCreator<ThunkResult> = (
  path: string,
) => dispatch => {
  // Extract the page name from path.
  const page = path === '/' ? 'main' : path.slice(1)

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page))

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false))
}

const loadPage: ActionCreator<ThunkResult> = (page: string) => dispatch => {
  switch (page) {
    case 'main':
      import('../components/views/view-main.js').then(({ title }) => {
        dispatch(updateTitle(title))
      })
      break
    case 'timetable':
    import('../components/views/view-timetable.js').then(({ title }) => {
      dispatch(updateTitle(title))
    })
    break
    case 'view3':
      import('../components/my-view3.js')
      break
    default:
      page = 'view404'
      import('../components/my-view404.js')
  }

  dispatch(updatePage(page))
}

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page,
  }
}

const updateTitle: ActionCreator<AppActionUpdateTitle> = (title: string) => {
  return {
    type: UPDATE_TITLE,
    title,
  }
}

let snackbarTimer: number

export const showSnackbar: ActionCreator<ThunkResult> = () => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR,
  })
  window.clearTimeout(snackbarTimer)
  snackbarTimer = window.setTimeout(
    () => dispatch({ type: CLOSE_SNACKBAR }),
    3000,
  )
}

export const updateOffline: ActionCreator<ThunkResult> = (offline: boolean) => (
  dispatch,
  getState,
) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app!.offline) {
    dispatch(showSnackbar())
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline,
  })
}

export const updateDrawerState: ActionCreator<AppActionUpdateDrawerState> = (
  opened: boolean,
) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened,
  }
}
