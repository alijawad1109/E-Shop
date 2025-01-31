import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isloggedIn : false,
    email:null,
    userName:null,
    userID:null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER :(state,action) =>{
        console.log(action.payload)
        const {email, userName,userID} =action.payload
        state.isloggedIn=true
        state.email=email;
        state.userName=userName;
        state.userID=userID
    },
    REMOVE_ACTIVE_USER: (state,action) =>{
        state.isloggedIn=false
        state.email=null;
        state.userName=null;
        state.userID=null;
    }
  }
});

export const {SET_ACTIVE_USER,REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isloggedIn
export const selectEmail = (state) => state.auth.email
export const selectuserID = (state) => state.auth.userID

export default authSlice.reducer