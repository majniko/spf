import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/lib/redux/rootReducer'
import createSagaMiddleware from '@redux-saga/core'
import { fork } from '@redux-saga/core/effects'
import { loginFormSaga } from '@/lib/redux/sagas/loginFormSaga'
import { userSaga } from '@/lib/redux/sagas/userSaga'
import { registerFormSaga } from '@/lib/redux/sagas/registerFormSaga'

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
  yield fork(registerFormSaga)
}

sagaMiddleware.run(rootSaga)

export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
