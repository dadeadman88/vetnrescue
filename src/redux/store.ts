import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import OtherSlice from './slices/OtherSlice'
import MainSlice from './slices/MainSlice'

export const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Main: MainSlice,
        Others: OtherSlice
    },
})