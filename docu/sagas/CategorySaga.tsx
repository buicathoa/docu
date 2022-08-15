
import { call, put, takeLatest } from "redux-saga/effects";
import CategoryReducer, { CategoryAction } from "../reducer/categoryReducer";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
function* fetchListCategory(action):Generator {
    try{
        const { param, resolve, reject } = action.payload
        try {
            const response = yield apiRequest(apiUrl.product.category, param)
            debugger
            // yield put(Actions.deleteMailRegisterSuccess(data.id))
            // yield put(AppActions.openLoading(false))
            if (resolve) yield resolve(response)
        } catch (error) {
            // yield put(AppActions.openLoading(false))
            if (reject) yield reject(error)
        }
    }
    catch(err) {}
    yield put({type: loadingAction.stopLoading.type})
}

export function* FollowFetchProduct():Generator{
    yield takeLatest(CategoryAction.fetchListCategory().type, fetchListCategory)
}