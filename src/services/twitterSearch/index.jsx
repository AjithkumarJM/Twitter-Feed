import API_CALL from "..";
import * as types from "./actionTypes";

export function getTwitterList(searchKey) {
    return API_CALL('get', `key=${searchKey}`, null, types);
}