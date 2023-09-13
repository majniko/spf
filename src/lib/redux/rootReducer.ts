import { userSlice } from '@/lib/redux/slices/userSlice'
import { loginFormSlice } from '@/lib/redux/slices/loginFormSlice'
import { registerFormSlice } from '@/lib/redux/slices/registerFormSlice'
import { categoriesSlice } from '@/lib/redux/slices/categoriesSlice'
import { alertsSlice } from '@/lib/redux/slices/alertsSlice'

export const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [loginFormSlice.name]: loginFormSlice.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
  [categoriesSlice.name]: categoriesSlice.reducer,
  [alertsSlice.name]: alertsSlice.reducer,
}
