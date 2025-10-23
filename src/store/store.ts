import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import createSagaMiddleware from 'redux-saga'

import { rootReducer } from '@/store/rootReducer'
import rootSaga from '@/store/rootSaga'
import { configureStore } from '@reduxjs/toolkit'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store }
