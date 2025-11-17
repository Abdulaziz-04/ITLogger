import React, { useReducer } from 'react';
import axios from 'axios';
import LogReducer, { defaultFilters } from './LogReducer';
import LogContext from './LogContext';
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
    CLEAR,
    SET_FILTERS
} from '../Types';

const LogState = props => {
    const initialState = {
        logs: [],
        techs: [],
        loading: false,
        error: null,
        current: null,
        filters: defaultFilters
    };
    const [state, dispatch] = useReducer(LogReducer, initialState);

    const getLogs = async () => {
        dispatch({ type: SET_LOADING });
        try {
            const res = await axios.get('/logs');
            dispatch({ type: GET_LOG, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to load logs'
            });
        }
    };

    const addLogs = async formData => {
        try {
            const res = await axios.post('/logs', formData);
            dispatch({ type: ADD_LOG, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to add log'
            });
        }
    };

    const getTechs = async () => {
        try {
            const res = await axios.get('/techs');
            dispatch({ type: GET_TECH, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to load techs'
            });
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
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to update log'
            });
        }
    };

    const deleteLogs = async log => {
        try {
            const res = await axios.delete(`/logs/${log._id}`);
            dispatch({ type: DELETE_LOG, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to delete log'
            });
        }
    };

    const addTechs = async formData => {
        try {
            const res = await axios.post('/techs', formData);
            dispatch({ type: ADD_TECH, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to add tech'
            });
        }
    };

    const deleteTechs = async tdata => {
        try {
            const res = await axios.delete(`/techs/${tdata._id}`);
            dispatch({ type: DELETE_TECH, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response?.data?.msg || 'Unable to delete tech'
            });
        }
    };

    const searchLogs = text => {
        dispatch({ type: SEARCH_LOG, payload: text });
    };

    const updateFilters = payload => {
        dispatch({ type: SET_FILTERS, payload });
    };

    const resetFilters = () => {
        dispatch({ type: SET_FILTERS, payload: { ...defaultFilters } });
        dispatch({ type: SEARCH_LOG, payload: '' });
    };

    return (
        <LogContext.Provider
            value={{
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
                updateFilters,
                resetFilters,
                current: state.current,
                error: state.error,
                loading: state.loading,
                logs: state.logs,
                techs: state.techs,
                filters: state.filters
            }}
        >
            {props.children}
        </LogContext.Provider>
    );
};

export default LogState;
