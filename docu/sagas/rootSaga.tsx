import { FollowFetchProduct } from "./CategorySaga";
import { all } from 'redux-saga/effects'
import { FollowFetchUser } from "./UserSaga";
import { FollowFetchLocation } from "./LocationSaga";
import { FollowFetchPost } from "./PostSaga";

export default function* rootSaga(){
    yield all([
        ...FollowFetchProduct(),
        ...FollowFetchUser(),
        ...FollowFetchLocation(),
        ...FollowFetchPost()
    ])
}