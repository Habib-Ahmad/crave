import { ADD_FAVORITE, REMOVE_FAVORITE } from "./constant";

export const FavReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        data: action.payload,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
