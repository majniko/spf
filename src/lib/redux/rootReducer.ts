import { userLogout, userSlice } from '@/lib/redux/slices/userSlice'
import { loginFormSlice } from '@/lib/redux/slices/loginFormSlice'
import { registerFormSlice } from '@/lib/redux/slices/registerFormSlice'
import { categoriesSlice } from '@/lib/redux/slices/categoriesSlice'
import { alertsSlice } from '@/lib/redux/slices/alertsSlice'
import { entriesSlice } from '@/lib/redux/slices/entriesSlice'
import { combineReducers } from 'redux'

export const rootReducer = (state: any, action: any) => {
  if (action.type === userLogout.type) {
    state = undefined
  }
  return combinedReducer(state, action)
}

const combinedReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [loginFormSlice.name]: loginFormSlice.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
  [categoriesSlice.name]: categoriesSlice.reducer,
  [alertsSlice.name]: alertsSlice.reducer,
  [entriesSlice.name]: entriesSlice.reducer,
})
