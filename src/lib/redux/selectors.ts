import { ReduxState } from '@/lib/redux/store'
import { LoginFormProps } from '@/features/components/loginForm/LoginForm'

export const getLogin = (state: ReduxState): LoginFormProps => state.loginForm
