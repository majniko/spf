import { userSlice } from '@/lib/redux/slices/userSlice/userSlice'
import { loginFormSlice } from '@/lib/redux/slices/loginFormSlice/loginFormSlice'
import { registerFormSlice } from '@/lib/redux/slices/registerFormSlice/registerFormSlice'

export const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [loginFormSlice.name]: loginFormSlice.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
}
