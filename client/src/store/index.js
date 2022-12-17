import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialUserState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        set_user(state, action) {
            state.user = action.payload
        },
        null_user(state) {
            state.user = null
        },
        logout_user(state, action) {
            axios.get('http://localhost:8000/api/users/logout',{withCredentials:true})
            .then(()=>{
                action.payload("/dashboard")
            })
            .catch((err)=>{
                action.payload("/")
            })
        },
    }
})


const store = configureStore({ reducer: userSlice.reducer });

export const userActions = userSlice.actions
export default store;
