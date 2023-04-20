import { all } from 'redux-saga/effects'

import {homeRegister} from './home'
import {contactRegister} from './contact'

export default function* rootSaga() {
  yield all([
    homeRegister(),
    contactRegister(),
  ])
}