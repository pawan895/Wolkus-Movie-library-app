import axios from 'axios';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY; 
const BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const OmdbService = {
  async searchMovies(query, page = 1) {
    try {
        
      const response = await axios.get(BASE_URL+'&s='+query+'&page='+page);
        
      if (response.data.Response === 'True') {
       
        return {
          movies: response.data.Search,
          
          totalResults: parseInt(response.data.totalResults, 10),
        };
      } else {
        throw new Error(response.data.Error);
      }
    } catch (error) {
      // Handle errors (e.g., network issues, invalid API key, no results)
      throw error;
    }
  },

  async getMovieDetails(imdbID) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          i: imdbID,
        },
      });

      if (response.data.Response === 'True') {
        return response.data;
      } else {
        throw new Error(response.data.Error);
      }
    } catch (error) {
      throw error;
    }
  },
};

export default OmdbService;
