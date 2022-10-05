import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'user',
    initialState: {userProfile:[]},
    reducers: ({
        fetchUserInfor: (state, action) => {
        },
        fetchLogin: (state, action) => {
            // debugger
        }
    })
})

export const UserActions = user.actions;

export const fetchUserInfor = state => state.user.fetchUserInfor;
export const fetchLogin = state => state.user.fetchLogin;
// export const fetchProductSearchSuccess = state => state.list.fetchProductSearchSuccess;

const UserReducer = user.reducer;
export default UserReducer;