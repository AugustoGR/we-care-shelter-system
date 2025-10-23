import { all } from 'redux-saga/effects'

export default function* rootSaga(): IterableIterator<any> {
  return yield all([])
}
