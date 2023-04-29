import React from 'react';
import { useState } from 'react';

import styles from './AutocompleteInput.module.scss';

const AutocompleteInput = (props) => {
  const [city, setCity] = useState('');
  const [res, setRes] = useState([]);

  const onNameClick = async (item) => {
    setCity(item.properties.name);
    props.getCityData([...item.geometry.coordinates]);
  };

  const autocomplete = async (city) => {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${city}&osm_tag=place:city`
    );
    const data = await response.json();
    setRes(
      data.features.map((el) => {
        let { osm_id, name, country, state } = el.properties;
        state = state ? state : '';
        return (
          <div
            key={osm_id}
            className={styles.result__item}
            onClick={() => onNameClick(el)}
          >
            {`${name}, ${country}, ${state}`}
          </div>
        );
      })
    );
  };

  const inputHandler = (e) => {
    setCity(e.currentTarget.value);
    autocomplete(city);
  };

  const buttonHandler = () => {
    props.resultClick();
    setRes([]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.search}>
          <input
            className={styles.autoInput}
            onChange={inputHandler}
            value={city}
            type="text"
          />
          <button className={styles.btn} onClick={buttonHandler}>
            SEARCH
          </button>
        </div>
        <div className={res.length > 0 ? styles.result : styles.resultNone}>
          {res}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteInput;
