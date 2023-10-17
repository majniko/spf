import {
  categoriesCallDelete,
  categoriesCallPost,
  categoriesCallPut,
  categoriesClearEdit,
  categoriesIsSubmittingSetFalse,
  categoriesSliceState,
} from '@/lib/redux/slices/categoriesSlice'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import { getCategoriesState } from '@/lib/redux/selectors'
import { postCategoryCall } from '@/features/helpers/clientAPICalls/categories/postCategoryCall'
import { alertsAddNewAlert } from '@/lib/redux/slices/alertsSlice'
import { localization } from '@/features/localization/localization'
import { putCategoryCall } from '@/features/helpers/clientAPICalls/categories/putCategoryCall'
import { deleteCategoryCall } from '@/features/helpers/clientAPICalls/categories/deleteCategoryCall'
import { userLogout } from '@/lib/redux/slices/userSlice'

type responseProps = {
  message: string
}

function* postNewCategory(action: ReturnType<typeof categoriesCallPost>) {
  if (!action.payload) return
  const { newCategoryName }: categoriesSliceState = yield select(getCategoriesState)

  const response: responseProps = yield call(postCategoryCall, { newCategoryName })

  if (response.message === 'success') {
    yield put(categoriesIsSubmittingSetFalse())
    yield put(alertsAddNewAlert({ message: localization.en.categories.addCategorySuccess, severity: 'success' }))
    action.payload.router.refresh()
    return
  }

  if (response.message === 'category_exists') {
    yield put(alertsAddNewAlert({ message: localization.en.categories.categoryExist, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
    return
  }

  if (response.message === 'invalid_token') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.invalidToken, severity: 'error' }))
    yield put(userLogout({ router: action.payload.router }))
    return
  }

  if (response.message === 'unexpected_prisma_error') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.unexpectedPrismaError, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
    return
  }
}

function* editCategory(action: ReturnType<typeof categoriesCallPut>) {
  if (!action.payload) return
  const { editedCategoryName, editedCategoryId }: categoriesSliceState = yield select(getCategoriesState)

  const response: responseProps = yield call(putCategoryCall, {
    editedCategoryName,
    categoryId: editedCategoryId,
  })

  if (response.message === 'success') {
    yield put(categoriesIsSubmittingSetFalse())
    yield put(categoriesClearEdit())
    yield put(alertsAddNewAlert({ message: localization.en.general.changesSaved, severity: 'success' }))
    action.payload.router.refresh()
    return
  }

  if (response.message === 'category_exists') {
    yield put(alertsAddNewAlert({ message: localization.en.categories.categoryExist, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
    yield put(categoriesClearEdit())
    return
  }

  if (response.message === 'invalid_token') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.invalidToken, severity: 'error' }))
    yield put(userLogout({ router: action.payload.router }))
    return
  }

  if (response.message === 'unexpected_prisma_error') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.unexpectedPrismaError, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
    yield put(categoriesClearEdit())
    return
  }
}

function* deleteCategory(action: ReturnType<typeof categoriesCallPut>) {
  if (!action.payload) return
  const { editedCategoryId }: categoriesSliceState = yield select(getCategoriesState)

  const response: responseProps = yield call(deleteCategoryCall, { categoryId: editedCategoryId })

  if (response.message === 'success') {
    yield put(categoriesIsSubmittingSetFalse())
    yield put(categoriesClearEdit())
    yield put(alertsAddNewAlert({ message: localization.en.general.changesSaved, severity: 'success' }))
    action.payload.router.refresh()
    return
  }

  if (response.message === 'invalid_token') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.invalidToken, severity: 'error' }))
    yield put(userLogout({ router: action.payload.router }))
    return
  }

  if (response.message === 'unexpected_prisma_error') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.unexpectedPrismaError, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
    yield put(categoriesClearEdit())
    return
  }
}

export const categoriesSaga = function* () {
  yield takeLatest(categoriesCallPost.type, postNewCategory)
  yield takeLatest(categoriesCallPut.type, editCategory)
  yield takeLatest(categoriesCallDelete.type, deleteCategory)
}
