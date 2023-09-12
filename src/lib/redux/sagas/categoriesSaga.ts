import { categoriesSetIsSubmitting, categoriesSliceState } from '@/lib/redux/slices/categoriesSlice/categoriesSlice'
import { call, select, takeLatest } from '@redux-saga/core/effects'
import { getCategoriesState } from '@/lib/redux/selectors'
import { postNewCategoryName } from '@/features/helpers/clientAPICalls/postNewCategoryName'

type responseProps = {
  message: string
}

function* postNewCategory(action: ReturnType<typeof categoriesSetIsSubmitting>) {
  if (!action.payload) return
  const { newCategoryName }: categoriesSliceState = yield select(getCategoriesState)

  const response: responseProps = yield call(postNewCategoryName, { newCategoryName })
  console.log(response)
  action.payload.router.refresh()
}

export const categoriesSaga = function* () {
  yield takeLatest(categoriesSetIsSubmitting.type, postNewCategory)
}
