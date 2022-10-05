
import { call, put, takeLatest } from "redux-saga/effects";
import CategoryReducer, { CategoryAction } from "../reducer/categoryReducer";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { UserActions } from "../reducer/userReducer";
function* fetchUserInfor(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.getUserInfor, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchLogin(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.user.login, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

export function* FollowFetchUser():Generator{
    yield takeLatest(UserActions.fetchUserInfor().type, fetchUserInfor)
    yield takeLatest(UserActions.fetchLogin().type, fetchLogin)
}