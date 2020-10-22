import {
    combineReducers
} from 'redux';

import errorReducer from './errorReducer';
import bookingReducer from './bookingReducer';
import authReducer from './authReducer';

export default combineReducers({
    errors: errorReducer,
    bookings: bookingReducer,
    auth: authReducer
})