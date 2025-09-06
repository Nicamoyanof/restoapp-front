import type { ActionReducerMap } from '@ngrx/store'
import { layoutReducer, type LayoutState } from './layout/layout-reducers'

import {
  authenticationReducer,
  type AuthenticationState,
} from './authentication/authentication.reducer'

export interface RootReducerState {
  authentication: AuthenticationState
  layout: LayoutState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  authentication: authenticationReducer,
  layout: layoutReducer,
}
