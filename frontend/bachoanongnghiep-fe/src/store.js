import { createStore } from 'redux';
import ReducerRoot from './redux/rootReducer'

const store = createStore(ReducerRoot);

export default store;