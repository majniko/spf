import {
  registerClearEmailError,
  registerClearPasswordError,
  registerClearUsernameError,
  registerFormSliceState,
  registerSetEmail,
  registerSetEmailError,
  registerSetIsSubmitting,
  registerSetIsSuccess,
  registerSetNetworkError,
  registerSetPassword,
  registerSetUsername,
  registerSetUsernameError,
} from '@/lib/redux/slices/registerFormSlice/registerFormSlice'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import { postRegister } from '@/features/helpers/clientAPICalls/postRegister'
import { getRegisterFormState } from '@/lib/redux/selectors'
import { localization } from '@/features/localization/localization'

type response = {
  message: string
  status: number
  error?: string
}

function* postRegisterForm(action: ReturnType<typeof registerSetIsSubmitting>) {
  if (!action.payload) return
  const { username, email, password }: registerFormSliceState = yield select(getRegisterFormState)

  const response: response = yield call(postRegister, {
    username: username.value,
    email: email.value,
    password: password.value,
  })

  console.log(response)

  if (response.message === 'user_created') {
    yield put({ type: registerSetIsSuccess.type, payload: true })
    return
  }

  if (response.message === 'username_exists') {
    yield put({ type: registerSetUsernameError.type, payload: localization.en.registerForm.request.usernameError })
    yield put({ type: registerSetIsSubmitting.type, payload: false })
    return
  }
  if (response.message === 'email_exists') {
    yield put({ type: registerSetEmailError.type, payload: localization.en.registerForm.request.emailError })
    yield put({ type: registerSetIsSubmitting.type, payload: false })
    return
  }

  if (response.error === 'network_error' || response.error === 'invalid_input') {
    yield put({ type: registerSetNetworkError.type, payload: true })
    yield put({ type: registerSetIsSubmitting.type, payload: false })
  }
}

function* clearUsernameError() {
  const { username }: registerFormSliceState = yield select(getRegisterFormState)
  if (username.error) yield put({ type: registerClearUsernameError.type })
}

function* clearEmailError() {
  const { email }: registerFormSliceState = yield select(getRegisterFormState)
  if (email.error) yield put({ type: registerClearEmailError.type })
}

function* clearPasswordError() {
  const { password }: registerFormSliceState = yield select(getRegisterFormState)
  if (password.error) {
    yield put({ type: registerClearPasswordError.type })
  }
}

export function* registerFormSaga() {
  yield takeLatest(registerSetIsSubmitting.type, postRegisterForm)
  yield takeLatest(registerSetUsername.type, clearUsernameError)
  yield takeLatest(registerSetEmail.type, clearEmailError)
  yield takeLatest(registerSetPassword.type, clearPasswordError)
}
