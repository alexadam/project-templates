import { takeLatest, takeEvery, call, put, all } from "redux-saga/effects";
import axios from 'axios'

import {ApiModelActionTypes} from '../api-model/actions'
 
function* actionWatcher() {
  yield takeLatest(ApiModelActionTypes.API_CALL_REQUEST, workerSaga);
}

function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    yield put({ type: "API_CALL_SUCCESS", data: dog });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
 }