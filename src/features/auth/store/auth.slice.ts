import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    token: null | string,
    user: | any
}

const initialState: AuthState = {
    token: localStorage.getItem("accessToken") || null,
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>)=>{
            state.token = action.payload
            localStorage.setItem("accessToken", state.token)
        },
        logout: (state) => {
            state.token = null
            localStorage.removeItem("accessToken")
        }
    }
})

export const {setToken,logout} = authSlice.actions
export default  authSlice.reducer