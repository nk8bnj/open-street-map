import './App.css';

import { useState } from 'react';

import AutocompleteInput from './components/AutocompleteInput/AutocompleteInput.jsx';
import OpenStreetMap from './components/OpenStreetMap/OpenStreetMap';

const App = () => {
  const [map, setMap] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const [newCityData, setNewCityData] = useState([]);

  const getCityData = (newCityData) => {
    setNewCityData([...newCityData]);
  };

  const resultClick = () => {
    setSearchMarker({
      coordinates: {
        lat: newCityData[1],
        lng: newCityData[0],
      },
    });
    if (map) {
      map.flyTo({
        lat: newCityData[1],
        lng: newCityData[0],
      });
    }
  };

  return (
    <div className="App">
      <div className="searchBox">
        <AutocompleteInput
          getCityData={getCityData}
          resultClick={resultClick}
        />
      </div>
      <div className="main">
        <div className="open-street-map">
          <OpenStreetMap searchMarker={searchMarker} setMap={setMap} />
        </div>
      </div>
    </div>
  );
};

export default App;
