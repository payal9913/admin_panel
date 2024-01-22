import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:'user',
    initialState:{
        data:[],
        error:null,
    },
    reducers:{
        fetchUserSuccess:(state,action)=>{
            state.data=action.payload;
        },
        fetchUserError:(state,action)=>{
            state.error=action.payload;
        },
        deleteuser:(state,action)=>{
            state.data=state.data.filter((user)=>user.id!==action.payload)
        },
        updateuser:(state,action)=>{
            state.data=state.data.map((user)=>
            user.id===action.payload.id?action.payload:user)
        }
    }
})

export const {fetchUserError,fetchUserSuccess,deleteuser,updateuser}=userslice.actions

export default userslice.reducer

