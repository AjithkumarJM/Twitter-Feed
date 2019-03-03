import axios from 'axios';
import cookie from 'react-cookies';

import { ROOT_URL } from "./../const";
import { getTwitterList } from './twitterSearch/index';

function getToken() {
    return cookie.load('session');
}

function API_CALL(method, url, data, type, callback, file) {
    console.log("Calling API for the method of " + method + " : " + ROOT_URL + url);
    axios.interceptors.response.use(undefined, function (err) {
        // Handling the errors (e.g: 401 Unauthorized)
        console.log(err);
        // cookie.remove('session', {
        //     path: '/'
        // });
        // window.location.href = '/logout';
    });
    let header = {};
    if (getToken()) {
        header['Authorization'] = getToken();
    }
    if (callback) {
        axios({
            method,
            url: ROOT_URL + url,
            data,
            headers: header,
            responseType: file ? 'arraybuffer' : 'json',
        }).then((data) => {
            return callback(data.data)
        })
    } else {
        return function (dispatch) {
            dispatch({
                type: type.REQ
            })
            axios({
                method,
                url: ROOT_URL + url,
                data,
                headers: header,
            }).then((response) => {
                dispatch({
                    type: type.RES,
                    payload: response
                })
            }).catch((error) => {
                dispatch({
                    type: type.FAIL,
                    payload: error
                })
            })
        }
    }
}

export default API_CALL;