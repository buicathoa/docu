import { createSlice } from '@reduxjs/toolkit'

const category = createSlice({
    name: 'category',
    initialState: {listCate:[]},
    reducers: ({
        fetchListCategory: (state, action) => {
        },
        fetchListFilterByCategory: (state, action) => {},
        fetchListBrandBySubcategory: (state, action) => {}
        // fetchListSuccess: (state, action) => {
        //     state.listCate = action.payload
        // }
    })
})

export const CategoryAction = category.actions;

export const fetchProductSearch = state => state.category.fetchProductSearch;
// export const fetchProductSearchSuccess = state => state.list.fetchProductSearchSuccess;

const CategoryReducer = category.reducer;
export default CategoryReducer;