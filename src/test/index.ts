import { createStore } from 'redux';

import { attendance } from '../reducers/main'
import { DATE_SELECTED, dateSelected } from '../actions'


const d = 3;
const m = 0;
const y = 2016;

const store = createStore(attendance);

console.log('initial state:', store.getState().attRec[m][d]);


store.subscribe(() => {
    console.log("new state:", store.getState().attRec[m][d]);
})

store.dispatch(dateSelected('10IS51', d, m));
store.dispatch(dateSelected('10IS51', d, m));

