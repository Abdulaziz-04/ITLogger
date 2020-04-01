import React, { useState, useContext, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Edit = () => {
    const context = useContext(LogContext);
    const { techs, current, updateLogs, clearAll } = context;
    const [data, setData] = useState({
        message: '',
        attention: false,
        tech: ''
    });
    const { message, attention, tech } = data;

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        if (current !== null) {
            setData(current);
        }
    }, [current]);
    const onSubmit = e => {
        e.preventDefault();
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter message and tech' });
        } else {
            updateLogs(data);

            setData({
                attention: false,
                message: '',
                tech: ''
            });
            M.toast({ html: 'Message Updated!' });
            clearAll();
        }
    };

    return (
        <div
            className='modal'
            style={{ width: '75%', height: '75%' }}
            id='edit-log-modal'
        >
            <div className='modal-content'>
                <h4>Edit System Log : </h4>
                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            value={message}
                            name='message'
                            onChange={onChange}
                        />
                        {current === null && (
                            <label htmlFor='message' className='active'>
                                Log Message
                            </label>
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        {techs && (
                            <select
                                name='tech'
                                onChange={onChange}
                                className='browser-default'
                                value={tech}
                            >
                                <option value='' disabled>
                                    Select Technician
                                </option>
                                {techs.map(t => (
                                    <option key={t._id} t={t}>
                                        {t.firstName + ' ' + t.lastName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <label>
                            <input
                                type='checkbox'
                                className='filled-in'
                                value={attention}
                                checked={attention}
                                name='attention'
                                onChange={e =>
                                    setData({ ...data, attention: !attention })
                                }
                            />
                            <span>Attention Required </span>
                        </label>
                    </div>
                </div>
                <div className='modal-footer'>
                    <a
                        href='#!'
                        onClick={onSubmit}
                        className='modal-close waves-light blue waves-effect btn '
                    >
                        Enter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Edit;
