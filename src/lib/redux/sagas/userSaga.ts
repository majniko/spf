import { takeEvery } from '@redux-saga/core/effects'
import { userLogout } from '@/lib/redux/slices/userSlice/userSlice'

function* logoutUser(action: ReturnType<typeof userLogout>) {
  action.payload.router.push('/login')
}

export function* userSaga() {
  yield takeEvery(userLogout.type, logoutUser)
}
