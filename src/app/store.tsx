import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/features/auth/store/auth.slice"

export const store = configureStore({
  reducer: {
    fake: ()=> null,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch