
import { call, put, takeLatest } from "redux-saga/effects";
import CategoryReducer, { CategoryAction } from "../reducer/categoryReducer";
import { apiRequest } from "../utils/apiRequest";
import { apiUrl } from "../constants";
function* fetchListCategory(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.product.category, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchListFilterByCategory(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.product.filterByCategory, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

function* fetchListBrandBySubcategory(action):Generator {
    const { param, resolve, reject } = action.payload
    try{
        const response = yield apiRequest(apiUrl.product.getBrandBySubcategory, param, 'general')
        if (resolve) yield resolve(response)
    }
    catch(err) {
        if (reject) yield reject(err)
    }
}

export function* FollowFetchProduct():Generator{
    yield takeLatest(CategoryAction.fetchListCategory().type, fetchListCategory)
    yield takeLatest(CategoryAction.fetchListFilterByCategory().type, fetchListFilterByCategory)
    yield takeLatest(CategoryAction.fetchListBrandBySubcategory().type, fetchListBrandBySubcategory)
}