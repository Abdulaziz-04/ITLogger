import React, { useEffect, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';
import './App.css';
import Search from './Components/Search';
import Logs from './Components/Logs';
import Actions from './Components/Actions';
import Edit from './Components/Edit';
import LogState from './ContextAPI/LogsAPI/LogState';

const App = () => {
    useEffect(() => {
        //Initializes materialize js
        M.AutoInit();
    });

    return (
        <LogState>
            <Fragment>
                <Search />
                <Actions />
                <Edit />
                <Logs />
            </Fragment>
        </LogState>
    );
};

export default App;
