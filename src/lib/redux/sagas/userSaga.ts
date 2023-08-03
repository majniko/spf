import { takeEvery } from '@redux-saga/core/effects'
import { userLogout } from '@/lib/redux/slices/userSlice/userSlice'

function* logoutUser(action: ReturnType<typeof userLogout>) {
  console.log('logging out')
  action.payload.router.push('/login')
  console.log('logged out')
}

export function* userSaga() {
  yield takeEvery(userLogout.type, logoutUser)
}
