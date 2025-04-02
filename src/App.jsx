import React from 'react';
import MapComponent from './components/MapComponent';
import SamplesData from './components/SamplesData.jsx';

import Russia from './components/Russia.jsx';

import './App.css';

function App() {
    return (
        <div className="App">
            <h5>Местоположение взятия проб</h5>
            <SamplesData />
            {/*<MapComponent1 />*/}
        </div>
    );
}

export default App;
