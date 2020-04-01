import React, { useContext } from 'react';
import Moment from 'react-moment';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const LogItem = ({ log }) => {
    const context = useContext(LogContext);
    const { setCurrent, deleteLogs } = context;
    return (
        <li className='collection-item'>
            <div>
                <a
                    href='#edit-log-modal'
                    onClick={() => setCurrent(log)}
                    className={`modal-trigger ${
                        log.attention ? 'red-text' : 'blue-text'
                    }`}
                >
                    {log.message}
                </a>
                <br />{' '}
                <span>
                    <strong style={{ fontWeight: 'bolder' }}>
                        ID #{log._id}{' '}
                    </strong>
                    last updated by{' '}
                    <strong style={{ fontWeight: 'bolder' }}>{log.tech}</strong>{' '}
                    on{' '}
                    <span className='black-text'>
                        <Moment format='MMMM Do YYYY, h:mm:ss a'>
                            {log.dt}
                        </Moment>
                    </span>
                </span>
                <a
                    href='#!'
                    className='secondary-content'
                    onClick={() => {
                        deleteLogs(log);
                    }}
                >
                    <i className='material-icons grey-text'>delete</i>
                </a>
            </div>
        </li>
    );
};

export default LogItem;
