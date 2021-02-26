import React, { createContext, useEffect, useReducer } from "react";
import { FavReducer } from "./reducer";
export const FavoriteContext = createContext();

export const FavoriteContextProvider = (props) => {
  //const [data, setData] = useState([]);
  const [favourites, dispatch] = useReducer(FavReducer, {}, () => {
    const data = localStorage.getItem("favourites");
    return data !== null ? JSON.parse(data) : { data: [] };
  });

  useEffect(() => {
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites !== null ? favourites : { data: [] })
    );
  }, [favourites]);

  return (
    <FavoriteContext.Provider value={{ favourites, dispatch }}>
      {props.children}
    </FavoriteContext.Provider>
  );
};

//export default FavoriteContextProvider;
