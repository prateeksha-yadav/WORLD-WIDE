import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/cities`;

const getToken = () => {
  return localStorage.getItem("token");
};

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Action Unknown");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await axios.get(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = res.data.cities;
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities...",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity._id) return;
      dispatch({ type: "loading" });
      try {
        const res = await axios.get(`${BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = res.data.city;
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity._id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}`, newCity, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = res;
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  async function refetch() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = res.data.cities;
      dispatch({ type: "cities/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the cities...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        error,
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        refetch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
};

export { CitiesProvider, useCities };
