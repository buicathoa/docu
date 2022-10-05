import { createSlice } from '@reduxjs/toolkit'

const location = createSlice({
    name: 'location',
    initialState: {},
    reducers: ({
        fetchListCity: (state, action) => {
        },
        fetchListDistricts: (state, action) => {},
        fetchListWards: (state, action) => {}
        // fetchListSuccess: (state, action) => {
        //     state.listCate = action.payload
        // }
    })
})

export const LocationAction = location.actions;

export const fetchListCity = state => state.location.fetchListCity;
export const fetchListDistricts = state => state.location.fetchListDistricts;
export const fetchListWards = state => state.location.fetchListWards;
// export const fetchProductSearchSuccess = state => state.list.fetchProductSearchSuccess;

const LocationReducer = location.reducer;
export default LocationReducer;