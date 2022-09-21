import { movieManagerService } from "../../services/MovieManagerService";
import { SET_CINEMA, SET_CINEPLEX, SET_MOVIES, SET_MOVIE_INFO } from "../types";

export const fetchMoviesAction = (nameMovie = "") => {
  return async (dispatch) => {
    try {
      const result = await movieManagerService.fetchMovies(nameMovie);
      dispatch({
        type: SET_MOVIES,
        payload: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addMovieByUploadImageAction = (formData, AddNewsuccess) => {
  return async (dispatch) => {
    try {
      const result = await movieManagerService.addMovieByUploadImage(formData);
      alert("add movie successfull");
      AddNewsuccess();
      console.log("addMovie", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const uploadMovieUpdateAction = (formData, Editsuccess) => {
  return async (dispatch) => {
    try {
      const result = await movieManagerService.uploadMovieUpdate(formData);
      alert("update movie successfull");
      console.log("resultEditMovie", result.data.content);
      //reload movieList
      dispatch(fetchMoviesAction());
      Editsuccess();
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getMovieInfoAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await movieManagerService.getMovieInfo(id);
      dispatch({
        type: SET_MOVIE_INFO,
        payload: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const deleteMovieAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await movieManagerService.deleteMovie(id);
      console.log("resultDeleteMovie", result.data.content);
      alert("delete movie successfull");
      //reload movieList
      dispatch(fetchMoviesAction());
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getCinemaInfoAction = (cinemaID = "") => {
  return async (dispatch) => {
    try {
      const res = await movieManagerService.getCinemaInfo(cinemaID);
      dispatch({
        type: SET_CINEMA,
        payload: res.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getCineplexInfoAction = (cinemaID = "") => {
  return async (dispatch) => {
    try {
      const res = await movieManagerService.getCineplexInfo(cinemaID);
      dispatch({
        type: SET_CINEPLEX,
        payload: res.data.content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const createShowTimesAction = (formData, createShowtimesSuccess) => {
  return async (dispatch) => {
    try {
      const result = await movieManagerService.createShowtimes(formData);
      alert("add showtimes successfull");
      createShowtimesSuccess();
      console.log("addMovie", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
