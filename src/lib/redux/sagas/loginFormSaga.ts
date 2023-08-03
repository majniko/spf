import { getLogin } from '@/lib/redux/selectors'
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
  status: number
  error?: string
}

function* postLoginSaga(action: ReturnType<typeof loginSetIsSubmitting>) {
  console.log('saga dispatched')
  const { username, password }: loginFormSliceState = yield select(getLogin)

  const response: response = yield call(postLogin, { username, password })

  console.log('response:', response)

  if (response.token) {
    const { token, email } = response

    console.log('response:', response)

    yield put({
      type: userSaveLoginData.type,
      payload: { username, token, email },
    })
    yield call(saveTokenToCookies, token)
    action.payload.router.push('/landing-page')
    yield put({ type: loginClearForm.type })
    return
  }

  if (response.error === 'network_error') {
    yield put({ type: loginSetIsNetworkError.type, payload: true })
    return
  }

  yield put({ type: loginSetIsError.type, payload: true })
}

export function* loginFormSaga() {
  yield takeLatest(loginSetIsSubmitting.type, postLoginSaga)
}
