import {
    GET_LOG,
    ADD_LOG,
    DELETE_LOG,
    UPDATE_LOG,
    ERROR,
    SET_CURRENT,
    SET_LOADING,
    DELETE_TECH,
    SEARCH_LOG,
    ADD_TECH,
    GET_TECH,
    CLEAR
} from '../Types';

const LogReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
        case GET_LOG:
            return {
                ...state,
                logs: action.payload,
                loading: false
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case ADD_LOG: {
            return {
                ...state,
                logs: [...state.logs, action.payload]
            };
        }
        case GET_TECH: {
            return {
                ...state,
                techs: action.payload
            };
        }
        case CLEAR: {
            return {
                ...state,
                error: null,
                current: null,
                loading: false,
                filter: null
            };
        }
        case SET_CURRENT: {
            return {
                ...state,
                current: action.payload
            };
        }
        case UPDATE_LOG: {
            return {
                ...state,
                logs: state.logs.map(log =>
                    log._id === action.payload._id ? action.payload : log
                )
            };
        }
        case DELETE_LOG: {
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.payload._id)
            };
        }
        case ADD_TECH: {
            return {
                ...state,
                techs: [...state.techs, action.payload]
            };
        }
        case DELETE_TECH: {
            return {
                ...state,
                techs: state.techs.filter(
                    tech => tech._id !== action.payload._id
                )
            };
        }
        case SEARCH_LOG: {
            return {
                ...state,
                filter: state.logs.filter(log => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return log.message.match(regex) || log.tech.match(regex);
                })
            };
        }
    }
};

export default LogReducer;
