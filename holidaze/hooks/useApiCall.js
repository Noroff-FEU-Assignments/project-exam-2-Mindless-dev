import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function useApiCall(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    async function fetchApiData(url) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setApiData(response.data);
          setSearchData(response.data); //added so the hook works with api calls that has a search function
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchApiData(url);
  }, []);

  return [apiData, searchData, setSearchData, loading, error];
}

useApiCall.propTypes = {
  url: PropTypes.string,
};
