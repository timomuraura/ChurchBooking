import isEmpty from '../validation/is-empty';
import {
    SET_CURRENT_PERSONNEL,
    RESET_PASSWORD
} from '../actions/types';


const initialState = {
    isAuthenticated: false,
    personnel: {},
    password: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_PERSONNEL:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                    personnel: action.payload,
            };


        case RESET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

            default:
                return state;
    }
}