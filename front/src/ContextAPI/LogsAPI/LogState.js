import React, { useReducer } from 'react';
import LogReducer from './LogReducer';
import LogContext from './LogContext';
import axios from 'axios';
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

const LogState = props => {
    const initialState = {
        logs: [],
        techs: [],
        loading: false,
        error: null,
        current: null,
        filter: null
    };
    const [state, dispatch] = useReducer(LogReducer, initialState);
    const getLogs = async () => {
        try {
            const res = await axios.get('/logs');
            dispatch({ type: GET_LOG, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };
    const addLogs = async formData => {
        try {
            const res = await axios.post('/logs', formData);
            dispatch({ type: ADD_LOG, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const getTechs = async () => {
        try {
            const res = await axios.get('/techs');
            dispatch({ type: GET_TECH, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const clearAll = () => {
        dispatch({ type: CLEAR });
    };
    const setCurrent = data => {
        dispatch({ type: SET_CURRENT, payload: data });
    };
    const updateLogs = async formData => {
        try {
            const res = await axios.put(`/logs/${formData._id}`, formData);
            dispatch({ type: UPDATE_LOG, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const deleteLogs = async log => {
        try {
            const res = await axios.delete(`/logs/${log._id}`);
            dispatch({ type: DELETE_LOG, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const addTechs = async formData => {
        try {
            const res = await axios.post('/techs', formData);
            dispatch({ type: ADD_TECH, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const deleteTechs = async tdata => {
        try {
            const res = await axios.delete(`/techs/${tdata._id}`);
            dispatch({ type: DELETE_TECH, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data.msg });
        }
    };
    const searchLogs = text => {
        dispatch({ type: SEARCH_LOG, payload: text });
    };
    return (
        <LogContext.Provider
            value={{
                setLoading,
                getLogs,
                addLogs,
                getTechs,
                clearAll,
                setCurrent,
                updateLogs,
                deleteLogs,
                addTechs,
                deleteTechs,
                searchLogs,
                current: state.current,
                error: state.error,
                loading: state.loading,
                logs: state.logs,
                techs: state.techs,
                filter: state.filter
            }}
        >
            {props.children}
        </LogContext.Provider>
    );
};

export default LogState;
