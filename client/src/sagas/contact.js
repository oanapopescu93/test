import { call, put, takeLatest } from "redux-saga/effects";
import { bringPayload, showPayload } from "../reducers/contact";

function request(){
    return api().then(function(res){
        return res
    })
}

function api(){
    return new Promise(function(resolve, reject){
        fetch('/api/contact', {
            method: 'POST',
            mode: 'cors',
            headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(err => console.error('fetchContact2--> ' + err));
    })
}

function* fetchBringPayload(){
    try{   
        const output = yield call(request)
        yield put(showPayload(output))
    } catch(error){
        console.log('fetchContact1--> ', error)
    }   
}

export function* contactRegister() {
    yield takeLatest(bringPayload.type, fetchBringPayload)
}