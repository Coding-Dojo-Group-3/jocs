import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



// const initialState = {
//     value: 0
// }

const initialUserState = {
    user: null
}

// function counterReducer(state = initialState, action) {
//     // Reducers usually look at the type of action that happened
//     // to decide how to update the state
//     switch (action.type) {
//         case 'counter/incremented':
//             return { ...state, value: state.value + 1 }
//         case 'counter/decremented':
//             return { ...state, value: state.value - 1 }
//         default:
//         // If the reducer doesn't care about this action type,
//         // return the existing state unchanged
//             return state
//     }
// }

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
                action.payload("/dashboard")
            })
        },
    }
})


// function userReducer(state = initialState, action) {
//     switch (action.type) {
//         case "SET_USER":
//             return{
//                 // ...state,
//                 user: action.payload
//             }
//         case "NULL_USER":
//             return{
//                 // ...state,
//                 user: null
//             }
//         case"LOGOUT_USER":
//             axios.get('http://localhost:8000/api/users/logout',{withCredentials:true})
//             .then(()=>{
//                 action.payload("/dashboard")
//             })
//             .catch((err)=>{
//                 action.payload("/dashboard")
//             })
//             return{
//                 // ...state,
//                 user: null
//             }
//         default:
//             return state
//     }
// }


const store = configureStore({ reducer: userSlice.reducer });
// const store = configureStore({ reducer: {
//     user: userSlice.reducer
// }});

export const userActions = userSlice.actions
export default store;
