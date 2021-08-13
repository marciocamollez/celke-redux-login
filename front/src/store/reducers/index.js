import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './users_reducer';

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default reducers;