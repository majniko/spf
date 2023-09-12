import { userSlice } from '@/lib/redux/slices/userSlice/userSlice'
import { loginFormSlice } from '@/lib/redux/slices/loginFormSlice/loginFormSlice'
import { registerFormSlice } from '@/lib/redux/slices/registerFormSlice/registerFormSlice'
import { categoriesSlice } from '@/lib/redux/slices/categoriesSlice/categoriesSlice'

export const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [loginFormSlice.name]: loginFormSlice.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
  [categoriesSlice.name]: categoriesSlice.reducer,
}
