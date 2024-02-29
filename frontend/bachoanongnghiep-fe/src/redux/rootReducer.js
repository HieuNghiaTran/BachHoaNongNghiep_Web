import { combineReducers } from 'redux';
import cartReducer from './Reducer/cartReducer';
import sectionReducer from './Reducer/sectionReducer';
import countReducer from './Reducer/countReducer';
import userReducer from './Reducer/userReducer';

const rootReducer = combineReducers({
    cartProvider: cartReducer,
    sectionProvider: sectionReducer,
    userProvider: userReducer,
    countProvider: countReducer,
});

export default rootReducer;
