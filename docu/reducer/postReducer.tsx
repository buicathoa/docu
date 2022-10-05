import { createSlice } from '@reduxjs/toolkit'

const post = createSlice({
    name: 'post',
    initialState: {},
    reducers: ({
        fetchUploadImage: (state, action) => {},
        fetchCreateNewPost: (state, action) => {}
    })
})

export const PostActions = post.actions;

export const fetchUploadImage = state => state.post.fetchUploadImage;
export const fetchCreateNewPost = state => state.post.fetchCreateNewPost;

const PostReducer = post.reducer;
export default PostReducer;