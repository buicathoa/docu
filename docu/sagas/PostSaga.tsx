
import { call, put, takeLatest } from "redux-saga/effects";
import CategoryReducer, { CategoryAction } from "../reducer/categoryReducer";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { UserActions } from "../reducer/userReducer";
import { PostActions } from "../reducer/postReducer";

function* fetchUploadImage(action):Generator {
    const { param, resolve, reject } = action.payload
    debugger
    try{
        const response = yield apiRequest(apiUrl.post.uploadImage, param?.param, 'image')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchCreateNewPost(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.post.createNewPost, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

export function* FollowFetchPost():Generator{
    yield takeLatest(PostActions.fetchUploadImage().type, fetchUploadImage)
    yield takeLatest(PostActions.fetchCreateNewPost().type, fetchCreateNewPost)
}