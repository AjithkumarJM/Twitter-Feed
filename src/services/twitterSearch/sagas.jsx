import { call, put, takeEvery, takeLatest, take, race } from 'redux-saga/effects'
import axios from 'axios';

import { REQ, RES, FAIL, START_POLLING, STOP_POLLING } from './actionTypes';
import { ROOT_URL } from '../../const';

function delay(duration) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), duration)
    })
    return promise
}

function* fetchList(action) {
    while (true) {
        try {
            const { data } = yield call(() => axios({ url: `${ROOT_URL}key=thala` }))
            yield put({ type: RES, data: data })
            yield call(delay, 3000)
        } catch (e) {
            yield put({ type: FAIL, message: e.message })
        }
    }
}

function* watchPollJokesSaga() {
    while (true) {
        const data = yield take(START_POLLING)
        yield race([call(fetchList, data), take(STOP_POLLING)])
    }
}

export default function* root() {
    yield [watchPollJokesSaga()]
}