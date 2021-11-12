import config from '../configs';
import {
  apiGetRequest,
  getCharacterDetail,
  getRequiredMovieData,
  sortByReleaseDate,
  getRequiredCharacterData,
  computeHeight,
  sortDataBy
} from '../utils';
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
    const res = await apiGetRequest(movieUrl);
    const { status } = res;
    if (status !== 200 && status >= 400) {
      throw new Error(null, status, 'Error occurred, try again later');
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
    const res = await apiGetRequest(movieUrl);
    const { status, message } = res;
    if (status !== 200 && status >= 400) {
      throw new Error(null, status, message);
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
   * get movie character details
   * @param {object} movies
   * @returns {Promise<{gender, name, height}[]>} character data
   */
  async getMovieCharacterDetails(movies) {
    // eslint-disable-next-line no-unused-vars
    const url = this.apiBaseUrl;
    if (movies.characters.length > 0) {
      const moviesCharacter = movies.characters;
      return Promise.all(
        moviesCharacter.map(async characterUrl => getCharacterDetail(characterUrl))
      );
    }
  }

  /**
   * get character list
   * @param {object} queryParams
   * @returns {object} characterlist
   */
  async getCharacterList(queryParams) {
    const { gender: filterData, sortBy, direction } = queryParams;
    const charactersUrl = this.apiBaseUrl.concat('/people');
    const res = await apiGetRequest(charactersUrl);
    const { status, message } = res;
    if (status !== 200 && status >= 400) {
      throw new Error(null, status, message);
    }
    const { results: characterList } = res.data;
    const charData = getRequiredCharacterData(characterList);

    const filteredData = filterData == null
      ? charData : charData.filter(char => char.gender === filterData);
    const characterData = sortDataBy(filteredData, sortBy, direction);
    const computeCharacterHeight = computeHeight(characterData);
    return {
      success: true,
      data: {
        metadata: {
          count: filteredData.length,
          height: computeCharacterHeight
        },
        list: filteredData
      }
    };
  }
}

export default MovieServices;
