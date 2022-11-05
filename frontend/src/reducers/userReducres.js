import {
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,

    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,

    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,

    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    DELETE_USER_SUCCESS,

    SEND_MAIL_REQUEST,
    SEND_MAIL_FAIL,
    SEND_MAIL_SUCCESS,

    CLEAR_ERRORS
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}



export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
                message: action.payload
            };
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const mailSendReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SEND_MAIL_REQUEST:
            return {
                loading: true,
            };
        case SEND_MAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };
        case SEND_MAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}