import React, { useEffect, useContext, Fragment } from 'react';
import LogItem from './LogItem';

import logContext from '../ContextAPI/LogsAPI/LogContext';

const Logs = () => {
    const context = useContext(logContext);
    const { loading, getLogs, setLoading, logs, filter } = context;
    useEffect(() => {
        setLoading();
        getLogs();
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <div
                className='preloader-wrapper big active'
                style={{ margin: ' 300px 450px 700px 950px ' }}
            >
                <div className='spinner-layer spinner-blue-only'>
                    <div className='circle-clipper left'>
                        <div className='circle'></div>
                    </div>
                    <div className='gap-patch'>
                        <div className='circle'></div>
                    </div>
                    <div className='circle-clipper right'>
                        <div className='circle'></div>
                    </div>
                </div>
            </div>
        );
    }
    if (!loading && logs.length === 0) {
        return <h3 className='center'>No logs to show...</h3>;
    }
    return (
        <Fragment>
            <ul
                className='collection with-header container'
                style={{ marginTop: '30px' }}
            >
                <li className='collection-header'>
                    <h4 className='center'>System Logs</h4>
                </li>
                {filter === null
                    ? logs.map(log => <LogItem log={log} key={log._id} />)
                    : filter.map(log => <LogItem log={log} key={log._id} />)}
            </ul>
            <div id='footer'>Created By : Abdulaziz Suria</div>
        </Fragment>
    );
};

export default Logs;
