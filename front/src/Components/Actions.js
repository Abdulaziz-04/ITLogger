import React from 'react';
import Form from './Form';
import AddTech from './AddTech';
import Techlist from './Techlist';

const Actions = () => {
    return (
        <div className='fixed-action-btn'>
            <a
                className='btn-floating btn-large blue darken modal-trigger'
                href='#more'
            >
                <i className='material-icons'>add</i>
            </a>
            <Form />
            <ul>
                <li>
                    <a
                        href='#tech-list'
                        className='btn-floating green modal-trigger'
                    >
                        <i className='material-icons'>person</i>
                    </a>
                </li>
                <Techlist />
                <li>
                    <a
                        href='#add-tech'
                        className='btn-floating red modal-trigger'
                    >
                        <i className='material-icons'>person_add</i>
                    </a>
                </li>
                <AddTech />
            </ul>
        </div>
    );
};

export default Actions;
