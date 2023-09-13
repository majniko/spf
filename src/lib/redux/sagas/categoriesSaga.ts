import {
  categoriesCallPost,
  categoriesCallPut,
  categoriesIsSubmittingSetFalse,
  categoriesSliceState,
} from '@/lib/redux/slices/categoriesSlice'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import { getCategoriesState } from '@/lib/redux/selectors'
import { postCategoryName } from '@/features/helpers/clientAPICalls/categories/postCategoryName'
import { alertsAddNewAlert } from '@/lib/redux/slices/alertsSlice'
import { localization } from '@/features/localization/localization'
import { putCategoryName } from '@/features/helpers/clientAPICalls/categories/putCategoryName'

type responseProps = {
  message: string
}

function* postNewCategory(action: ReturnType<typeof categoriesCallPost>) {
  if (!action.payload) return
  const { newCategoryName }: categoriesSliceState = yield select(getCategoriesState)

  const response: responseProps = yield call(postCategoryName, { newCategoryName })

  if (response.message === 'success') {
    yield put(categoriesIsSubmittingSetFalse())
    action.payload.router.refresh()
    return
  }
  if (response.message === 'category_exists') {
    yield put(alertsAddNewAlert({ message: localization.en.categories.categoryExist, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
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

  const response: responseProps = yield call(putCategoryName, {
    editedCategoryName,
    categoryId: editedCategoryId,
  })

  if (response.message === 'success') {
    yield put(categoriesIsSubmittingSetFalse())
    action.payload.router.refresh()
    return
  }

  if (response.message === 'unexpected_prisma_error') {
    yield put(alertsAddNewAlert({ message: localization.en.errors.unexpectedPrismaError, severity: 'error' }))
    yield put(categoriesIsSubmittingSetFalse())
    return
  }
}

export const categoriesSaga = function* () {
  yield takeLatest(categoriesCallPost.type, postNewCategory)
}
