
import { call, put, takeLatest } from "redux-saga/effects";
import CategoryReducer, { CategoryAction } from "../reducer/categoryReducer";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
import { UserActions } from "../reducer/userReducer";
import { LocationAction } from "../reducer/locationReducer";
function* fetchListCity(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.location.getListCities, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchListDistricts(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.location.getListDistricts, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchListWards(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.location.getListWards, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}


export function* FollowFetchLocation():Generator{
    yield takeLatest(LocationAction.fetchListCity().type, fetchListCity)
    yield takeLatest(LocationAction.fetchListDistricts().type, fetchListDistricts)
    yield takeLatest(LocationAction.fetchListWards().type, fetchListWards)
}