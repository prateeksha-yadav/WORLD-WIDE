import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";

function CityList() {
  const { cities, isLoading, refetch } = useCities();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities?.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}

export default CityList;
