import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import { entriesCallPost, entriesSetIsSubmittingFalse, entriesState } from '@/lib/redux/slices/entriesSlice'
import { getEntriesState } from '@/lib/redux/selectors'
import { postEntryCall } from '@/features/helpers/clientAPICalls/entries/postEntryCall'
import { alertsAddNewAlert } from '@/lib/redux/slices/alertsSlice'
import { localization } from '@/features/localization/localization'
import { TypeOf } from 'zod'

type postEntrySagaResponse = {
  message: string
}

function* postEntrySaga(action: ReturnType<typeof entriesCallPost>) {
  const { newEntry }: entriesState = yield select(getEntriesState)

  try {
    const response: postEntrySagaResponse = yield call(postEntryCall, { newEntry })
    yield put(alertsAddNewAlert({ message: response.message, severity: 'success' }))
    yield put(entriesSetIsSubmittingFalse())
    action.payload.router.refresh()
  } catch (error) {
    yield put(alertsAddNewAlert({ message: localization.en.errors.networkError, severity: 'error' }))
  }
}

export function* entriesSaga() {
  yield takeLatest(entriesCallPost, postEntrySaga)
}
