import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

 
const useAxiosHook = myUrl => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(myUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios.get(url);

        // Gets response, makes request to grab additional details for each movie, appends details to each movie object.
        await Promise.all(
          response.data.results.map(async movie => {
            const responseDetails = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&&language=en-US&append_to_response=include_image_language=en,null`
            );
            movie.details = responseDetails.data;
          })
        );

        setData(response.data.results);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false); // Should trigger loading spinner, or throw error if axios request fails.
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useAxiosHook;
