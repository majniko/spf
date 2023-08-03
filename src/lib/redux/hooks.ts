import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ReduxDispatch, ReduxState } from '@/lib/redux/store'

export const useAppDispatch = () => useDispatch<ReduxDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector
