import { getLoginFormState } from '@/lib/redux/selectors'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import {
  loginClearForm,
  loginFormSliceState,
  loginSetIsError,
  loginSetIsNetworkError,
  loginSetIsSubmitting,
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
    yield put({ type: loginClearForm.type })
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

export function* loginFormSaga() {
  yield takeLatest(loginSetIsSubmitting.type, postLoginForm)
}
