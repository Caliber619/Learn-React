import { createSlice } from "@reduxjs/toolkit";
// ye slice hai authentication ko track krne ke liye ki user 
// authenticated hai ya nahi

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state)=>{         // we don't need action here
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;