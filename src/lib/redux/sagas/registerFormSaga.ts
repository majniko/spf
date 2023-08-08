import {
  registerFormSliceState,
  registerSetIsEmailError,
  registerSetIsNetworkError,
  registerSetIsSubmitting,
  registerSetIsSuccess,
  registerSetIsUsernameError,
} from '@/lib/redux/slices/registerFormSlice/registerFormSlice'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import { postRegister } from '@/features/helpers/clientAPICalls/postRegister'
import { getRegisterFormState } from '@/lib/redux/selectors'

type response = {
  message: string
  status: number
  error?: string
}

function* postRegisterForm(action: ReturnType<typeof registerSetIsSubmitting>) {
  const { username, email, password }: registerFormSliceState = yield select(getRegisterFormState)

  const response: response = yield call(postRegister, { username, email, password })

  console.log(response)

  if (response.message === 'user_created') {
    yield put({ type: registerSetIsSuccess.type, payload: true })
    return
  }

  if (response.message === 'username_exists') {
    yield put({ type: registerSetIsUsernameError.type, payload: true })
    return
  }
  if (response.message === 'email_exists') {
    yield put({ type: registerSetIsEmailError.type, payload: true })
    return
  }

  if (response.error === 'network_error') {
    yield put({ type: registerSetIsNetworkError.type, payload: true })
  }
}

export function* registerFormSaga() {
  yield takeLatest(registerSetIsSubmitting.type, postRegisterForm)
}
