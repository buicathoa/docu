import createSagaMiddleware from "@redux-saga/core";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createRouterMiddleware, routerReducer } from "connected-next-router";
// import NotifyReducer from "reducer/NotifySlice";
// import AddressReducer from "../reducer/AddressSlice";
// import CategoryReducer from "../reducer/CategorySlice";
// import dangKyReducer from "../reducer/DangKySlice";
// import detailProductReducer from "../reducer/DetailProduct";
// import ListCateProductReducer from "../reducer/ListCateProductSlice";
// import ListGroupReducer from "../reducer/ListGroupSlice";
// import ListNccReducer from "../reducer/ListNccSlice";
// import listProductNccReducer from "../reducer/ListProductNcc";
// import listProductReducer from "../reducer/ListProductSlice";
// import ListReducer from "../reducer/ListSlice";
// import loadingReducer from "../reducer/LoadingSlice";
// import loginReducer from "../reducer/LoginSlice";
// import manageCustomerReducer from "../reducer/ManageCustomerSlice";
// import productFavouriteReducer from "../reducer/ProductFavouriteSlice";
// import searchOrderReducer from "../reducer/SearchOrderSlice";
// import ShoppingReducer from "../reducer/ShoppingSlice";
// import GrouponReducer from "../reducer/MuaChungSlice";
// import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
    router: routerReducer,
    // loading: loadingReducer,
    // login: loginReducer,
    // dangKy: dangKyReducer,
    // listProduct: listProductReducer,
    // category: CategoryReducer,
    // listNcc: ListNccReducer,
    // list: ListReducer,
    // detailProduct: detailProductReducer,
    // listProductNcc: listProductNccReducer,
    // listCateProduct: ListCateProductReducer,
    // manageCustomer: manageCustomerReducer,
    // shopping: ShoppingReducer,
    // listGroup: ListGroupReducer,
    // address: AddressReducer,
    // favourite: productFavouriteReducer,
    // notify: NotifyReducer,
    // searchOrder: searchOrderReducer,
    // Groupon: GrouponReducer
})

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware()
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
})

// sagaMiddleware.run(rootSaga);

export default store;