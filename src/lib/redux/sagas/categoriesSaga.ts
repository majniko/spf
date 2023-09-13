import { categoriesSetIsSubmitting, categoriesSliceState } from '@/lib/redux/slices/categoriesSlice'
import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import { getCategoriesState } from '@/lib/redux/selectors'
import { postNewCategoryName } from '@/features/helpers/clientAPICalls/postNewCategoryName'
import { alertsAddNewAlert } from '@/lib/redux/slices/alertsSlice'
import { localization } from '@/features/localization/localization'

type responseProps = {
  message: string
}

function* postNewCategory(action: ReturnType<typeof categoriesSetIsSubmitting>) {
  if (!action.payload) return
  const { newCategoryName }: categoriesSliceState = yield select(getCategoriesState)

  const response: responseProps = yield call(postNewCategoryName, { newCategoryName })
  console.log(response)

  if (response.message === 'success') {
    action.payload.router.refresh()
    return
  }

  if (response.message === 'category_exists') {
    yield put(alertsAddNewAlert({ message: localization.en.categories.categoryExist, severity: 'error' }))
  }
}

export const categoriesSaga = function* () {
  yield takeLatest(categoriesSetIsSubmitting.type, postNewCategory)
}
