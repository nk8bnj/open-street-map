import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import airportIcon from '../../assets/airport';
import airportsData from '../../data/airports.json';
import data from '../../data/data.json';

const OpenStreetMap = (props) => {
  const [citiesActive, setCitiesActive] = useState(false);
  const [airportsActive, setAirportsActive] = useState(false);

  const airports = airportsData.filter((airport) => {
    if (data.cities.find((city) => airport.city === city.city)) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={10}
        scrollWheelZoom={true}
        whenCreated={(map) => props.setMap(map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {citiesActive &&
          data.cities.map((city) => (
            <Marker key={city.id} position={{ lat: city.lat, lng: city.lon }}>
              <Popup>{city.city}</Popup>
            </Marker>
          ))}
        {airportsActive &&
          airports.map((airport) => (
            <Marker
              key={airport.objectID}
              icon={airportIcon}
              position={{
                lat: airport._geoloc.lat,
                lng: airport._geoloc.lng,
              }}
            ></Marker>
          ))}
        {props.searchMarker && (
          <Marker position={props.searchMarker.coordinates}>
            <Popup>{props.searchMarker.name}</Popup>
          </Marker>
        )}
      </MapContainer>
      <div className="temp">
        <div className="checkBoxes">
          show cities:
          <input
            type="checkbox"
            checked={citiesActive}
            onChange={() => setCitiesActive(!citiesActive)}
          />
          show airports:
          <input
            type="checkbox"
            checked={airportsActive}
            onChange={() => setAirportsActive(!airportsActive)}
          />
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMap;
