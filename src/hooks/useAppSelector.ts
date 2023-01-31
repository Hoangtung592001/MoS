import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '~/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector;