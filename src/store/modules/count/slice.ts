import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  count: number
}

const initialState: initialStateType = {
  count: 0,
}

export const testSlice = createSlice({
  name: 'countSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += +1
    },
  },
})

export const { increment } = testSlice.actions
export const reducer = testSlice.reducer
