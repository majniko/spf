import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import {
  entriesCallPost,
  entriesNewEntryChange,
  entriesSetError,
  entriesSetIsSubmittingFalse,
  entriesState,
} from '@/lib/redux/slices/entriesSlice'
import { getEntriesState } from '@/lib/redux/selectors'
import { postEntryCall } from '@/features/helpers/clientAPICalls/entries/postEntryCall'
import { alertsAddNewAlert } from '@/lib/redux/slices/alertsSlice'
import { localization } from '@/features/localization/localization'
import { userLogout } from '@/lib/redux/slices/userSlice'

type postEntrySagaResponse = {
  message: string
}

function* postEntrySaga(action: ReturnType<typeof entriesCallPost>) {
  const { newEntry }: entriesState = yield select(getEntriesState)

  const response: postEntrySagaResponse = yield call(postEntryCall, { newEntry })

  if (response.message === 'entry_created') {
    yield put(alertsAddNewAlert({ message: localization.en.entries.entryAdded, severity: 'success' }))
    yield put(entriesSetIsSubmittingFalse())
    action.payload.router.refresh()
    return
  }

  if (response.message === 'invalid_request') {
    yield put(alertsAddNewAlert({ message: localization.en.entries.serverValidationError, severity: 'error' }))
    return
  }

  if (response.message === 'invalid_token') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.invalidToken, severity: 'error' }))
    yield put(userLogout({ router: action.payload.router }))
    return
  }

  if (response.message === 'unexpected_prisma_error') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.networkError, severity: 'error' }))
    return
  }

  if (response.message === 'network_error') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.networkError, severity: 'error' }))
    return
  }
}

export function* resetEntriesError() {
  const { isError }: entriesState = yield select(getEntriesState)

  if (isError) yield put(entriesSetError(false))
}

export function* entriesSaga() {
  yield takeLatest(entriesCallPost, postEntrySaga)
  yield takeLatest(entriesNewEntryChange, resetEntriesError)
}
