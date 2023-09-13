import { ReduxState } from '@/lib/redux/store'
import { loginFormSliceState } from '@/lib/redux/slices/loginFormSlice'
import { registerFormSliceState } from '@/lib/redux/slices/registerFormSlice'

export const getLoginFormState = (state: ReduxState): loginFormSliceState => state.loginForm
export const getRegisterFormState = (state: ReduxState): registerFormSliceState => state.registerForm
export const getCategoriesState = (state: ReduxState) => state.categories
