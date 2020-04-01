import React, { useContext } from 'react';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Techlist = () => {
    const context = useContext(LogContext);
    const { techs, deleteTechs } = context;
    if (techs.length === 0) {
        return (
            <div className='modal' id='tech-list'>
                <div className='modal-content'>
                    <div className='row'>
                        <div className='left'>Technician List :</div>
                    </div>
                </div>
                <div className='row'>
                    <h4 className='center'> Please add Technicians... </h4>
                </div>
            </div>
        );
    }
    return (
        <div
            className='modal'
            id='tech-list'
            style={{ width: '50%', height: '50%' }}
        >
            <div className='modal-content'>
                <div className='row'>
                    <h4 className='left'>Technician List :</h4>
                </div>
                <div
                    className='collection with-header container'
                    style={{ width: '100%', height: '100%' }}
                >
                    {techs &&
                        techs.map(tech => (
                            <li
                                className='collection-header'
                                key={tech._id}
                                tech={tech}
                            >
                                <i className='material-icons left'>face</i>
                                <strong
                                    className='left'
                                    style={{
                                        fontWeight: 'bolder'
                                    }}
                                >
                                    <a
                                        href='#edit-tech'
                                        className='modal-trigger'
                                    >
                                        {' '}
                                        {tech.firstName + ' ' + tech.lastName}
                                    </a>
                                </strong>

                                <a
                                    href='#!'
                                    onClick={() => {
                                        deleteTechs(tech);
                                    }}
                                    className='secondary-content'
                                >
                                    <i className='material-icons grey-text'>
                                        delete
                                    </i>
                                </a>

                                <br />
                            </li>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Techlist;
