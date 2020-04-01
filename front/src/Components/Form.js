import React, { useState, useContext, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Form = () => {
    const context = useContext(LogContext);
    const { addLogs, getTechs, techs, clearAll, addTechs } = context;
    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        getTechs();
        //eslint-disable-next-line
    }, [addTechs]);
    const onSubmit = e => {
        e.preventDefault();
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter a Message and Tech' });
        } else {
            addLogs(data);
            setData({
                message: '',
                attention: false,
                tech: ''
            });
            M.toast({ html: 'Message Logged!' });
            clearAll();
        }
    };
    const [data, setData] = useState({
        message: '',
        attention: false,
        tech: ''
    });
    const { message, attention, tech } = data;
    return (
        <div
            className='modal'
            style={{ width: '75%', height: '75%' }}
            id='more'
        >
            <div className='modal-content'>
                <h4>Enter System Log : </h4>
                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            value={message}
                            name='message'
                            onChange={onChange}
                        />
                        <label htmlFor='message' className='active'>
                            Log Message
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        {techs && (
                            <select
                                name='tech'
                                value={tech}
                                onChange={onChange}
                                className='browser-default'
                            >
                                <option defaultValue=''>
                                    Select Technician
                                </option>
                                {techs.map(tech => (
                                    <option key={tech._id} tech={tech}>
                                        {tech.firstName + ' ' + tech.lastName}
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

export default Form;
