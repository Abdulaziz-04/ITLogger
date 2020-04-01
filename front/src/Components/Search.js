import React, { Fragment, useEffect, useRef, useContext } from 'react';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Search = () => {
    const context = useContext(LogContext);
    const { searchLogs, clearAll, filter } = context;
    const text = useRef('');
    useEffect(() => {
        if (filter === 'null') {
            text.current.value = '';
        }
        //eslint-disable-next-line
    }, []);
    const onChange = e => {
        if (text.current.value !== '') {
            searchLogs(e.target.value);
        } else {
            clearAll();
        }
    };
    return (
        <Fragment>
            <nav>
                <div className='nav-wrapper blue'>
                    <div className='brand-logo' style={{ marginLeft: '10px' }}>
                        <i
                            className='large material-icons'
                            style={{ fontSize: '4rem' }}
                        >
                            developer_board
                        </i>
                        <strong
                            style={{
                                fontFamily: 'Arial',
                                fontWeight: 'bolder'
                            }}
                        >
                            IT Logger
                        </strong>
                    </div>

                    <div
                        className='input-field'
                        style={{
                            margin: ' 0px 150px 0px 400px',
                            padding: '12px 0px 12px 0px'
                        }}
                    >
                        <input
                            type='search'
                            placeholder='Search logs...'
                            onChange={onChange}
                        />
                        <label className='label-icon' htmlFor='search'>
                            <i className='material-icons'>search</i>
                        </label>
                        <i className='material-icons'>close</i>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default Search;
