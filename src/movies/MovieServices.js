import axios from 'axios';
import config from '../configs';
import { getRequiredMovieData, sortByReleaseDate } from '../utils';
import Error from '../utils/ErrorUtils';

const { api_base_url: apiBaseUrl } = config;

/**
 * Movie services
 */
class MovieServices {
  /**
   * initiate
   */
  constructor() {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * get movies list
   * @returns {object} movieList
   */
  async getMovieList() {
    const movieUrl = this.apiBaseUrl.concat('/films');
    const res = await axios.get(movieUrl);
    const { status } = res;
    if (status !== 200 && status >= 400) {
      throw new Error('', status, 'Error occurred, try again later');
    }
    const { results: movieList } = res.data;
    const sortData = getRequiredMovieData(movieList);
    const movieData = sortByReleaseDate(sortData);
    return {
      success: true,
      data: movieData
    };
  }

  /**
   * get single movies and character
   * @param {number} movieId
   * @returns {object} movieData
   */
  async getMovieDetails(movieId) {
    const movieUrl = this.apiBaseUrl.concat(`/films/${movieId}`);
    const res = await axios.get(movieUrl);
    const { status } = res;
    if (status !== 200 && status >= 400) {
      throw new Error('', status, 'Error occurred, try again later');
    }
    const movies = res.data;
    const { title, opening_crawl: openingCrawl } = movies;
    const characters = await this.getMovieCharacterDetails(movies);
    return {
      success: true,
      data: {
        title,
        openingCrawl,
        characters
      }
    };
  }

  /**
   * get character details
   * @param {string} characterUrl
   * @returns {Promise<{gender, name, height}>} character detail
   */
  async getCharacterDetail(characterUrl) {
    // eslint-disable-next-line no-unused-vars
    const url = this.apiBaseUrl;
    const res = await axios.get(characterUrl);
    const {
      name,
      gender,
      height
    } = res.data;
    return {
      name,
      gender,
      height
    };
  }


  /**
   * get movie character details
   * @param {object} movies
   * @returns {Promise<{gender, name, height}[]>} character data
   */
  async getMovieCharacterDetails(movies) {
    if (movies.characters.length > 0) {
      const moviesCharacter = movies.characters;
      const charactersDetails = await Promise.all(
        moviesCharacter.map(async (characterUrl) => {
          const characters = await this.getCharacterDetail(characterUrl);
          return characters;
        })
      );
      return charactersDetails;
    }
  }
}

export default MovieServices;
