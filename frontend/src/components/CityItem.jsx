import { Link } from "react-router";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) => {
  if (!date) return "No date provided";

  const parsedDate = new Date(date);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

function CityItem({ city }) {
  const { currentCity, deleteCity, refetch } = useCities();
  const { cityName, emoji, date, _id, position } = city;

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(_id);
    refetch();
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          _id === currentCity._id ? styles["cityItem--active"] : ""
        }`}
        to={`${_id}?lat=${position?.lat}&lng=${position?.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
