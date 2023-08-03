import { userSlice } from '@/lib/redux/slices/userSlice/userSlice'
import { loginFormSlice } from '@/lib/redux/slices/loginFormSlice/loginFormSlice'

export const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [loginFormSlice.name]: loginFormSlice.reducer,
}
