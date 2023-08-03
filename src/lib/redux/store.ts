import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/lib/redux/rootReducer'
import createSagaMiddleware from '@redux-saga/core'
import { fork } from '@redux-saga/core/effects'
import { loginFormSaga } from '@/lib/redux/sagas/loginFormSaga'
import { loginSetIsSubmitting } from '@/lib/redux/slices/loginFormSlice/loginFormSlice'
import { userLogout } from '@/lib/redux/slices/userSlice/userSlice'
import { userSaga } from '@/lib/redux/sagas/userSaga'

let sagaMiddleware = createSagaMiddleware()

export const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: { ignoredActions: ['loginForm/loginSetIsSubmitting', 'user/userLogout'] },
    }).concat(sagaMiddleware)
  },
})

function* rootSaga() {
  yield fork(loginFormSaga)
  yield fork(userSaga)
}

sagaMiddleware.run(rootSaga)

export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
