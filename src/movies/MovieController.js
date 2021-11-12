import MovieServices from './MovieServices';
import { displayError } from '../utils';

const MovieServiceInstance = new MovieServices();


export const getAllMovies = async (req, res) => {
  try {
    const results = await MovieServiceInstance.getMovieList();

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};

export const getSingleMovies = async (req, res) => {
  try {
    const results = await MovieServiceInstance.getMovieDetails(req.params.id);

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};

export const getAllCharacters = async (req, res) => {
  try {
    const results = await MovieServiceInstance.getCharacterList(req.query);

    return res.json(results).status(200);
  } catch (error) {
    return displayError(error, res, error.httpStatusCode);
  }
};
