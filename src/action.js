import { ADD_FAVORITE, REMOVE_FAVORITE } from "./constant";

export const AddFavorite = (payload) => {
  return {
    type: ADD_FAVORITE,
    payload: payload,
  };
};

export const RemoveFavorite = (payload) => {
  return {
    type: REMOVE_FAVORITE,
    payload: payload,
  };
};
