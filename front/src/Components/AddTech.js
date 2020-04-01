import React, { useState, useContext } from 'react';
import LogContext from '../ContextAPI/LogsAPI/LogContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddTech = () => {
    const context = useContext(LogContext);
    const { addTechs, clearAll } = context;
    const [techdata, setTechdata] = useState({
        firstName: '',
        lastName: ''
    });
    const onChange = e => {
        setTechdata({ ...techdata, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        if (firstName === '' || lastName === '') {
            M.toast({ html: 'Please enter the required fields' });
        } else {
            addTechs(techdata);
            setTechdata({
                firstName: '',
                lastName: ''
            });
            M.toast({ html: 'Technician Added!' });
            clearAll();
        }
    };
    const { firstName, lastName } = techdata;
    return (
        <div className='modal' id='add-tech'>
            <div className='modal-content'>
                <div className='row '>
                    <h4 className=' left'>Add Technician :</h4>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <label className='active blue-text'>First Name</label>
                        <input
                            type='text'
                            value={firstName}
                            name='firstName'
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <label className='active blue-text'>Last Name</label>
                        <input
                            type='text'
                            value={lastName}
                            name='lastName'
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className='modal-footer'>
                    <a
                        href='#!'
                        onClick={onSubmit}
                        className='modal-close waves-light blue waves-effect btn '
                    >
                        Add
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AddTech;
