import { getLoginFormState } from '@/lib/redux/selectors'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import {
  loginFormSliceState,
  loginSetIsError,
  loginSetIsNetworkError,
  loginSetIsSubmitting,
  loginSetPassword,
  loginSetUsername,
} from '@/lib/redux/slices/loginFormSlice/loginFormSlice'
import { postLogin } from '@/features/helpers/clientAPICalls/postLogin'
import { userSaveLoginData } from '@/lib/redux/slices/userSlice/userSlice'
import { saveTokenToCookies } from '@/features/helpers/cookies/saveTokenToCookies'

type response = {
  token: string
  email: string
  message?: string
  error?: string
}

function* postLoginForm(action: ReturnType<typeof loginSetIsSubmitting>) {
  const { username, password }: loginFormSliceState = yield select(getLoginFormState)

  const response: response = yield call(postLogin, { username, password })

  if (response.token) {
    const { token, email } = response
    yield put({ type: userSaveLoginData.type, payload: { username, token, email } })
    yield call(saveTokenToCookies, token)
    action.payload.router.push('/landing-page')
    return
  }

  if (response.message === 'invalid_credentials') {
    yield put({ type: loginSetIsError.type, payload: true })
    return
  }

  if (response.error === 'network_error') {
    yield put({ type: loginSetIsNetworkError.type, payload: true })
  }
}

function* clearErrors() {
  const { isError, isNetworkError }: loginFormSliceState = yield select(getLoginFormState)
  if (isError) yield put({ type: loginSetIsError.type, payload: false })
  if (isNetworkError) yield put({ type: loginSetIsNetworkError.type, payload: false })
}

export function* loginFormSaga() {
  yield takeLatest(loginSetIsSubmitting.type, postLoginForm)
  yield takeLatest(loginSetUsername.type, clearErrors)
  yield takeLatest(loginSetPassword.type, clearErrors)
}
