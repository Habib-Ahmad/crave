import React, { useContext, useEffect } from "react";
import { FavoriteContext } from "../FavoriteContext";
import "./Favorites.css";
import FoodCard from "./FoodCard";

const Favorites = () => {
  const { favourites, dispatch } = useContext(FavoriteContext);

  useEffect(() => {
    console.log(favourites);
  }, []);

  return (
    <div className="favorites">
      {favourites &&
        favourites?.data?.map((fav) => <FoodCard key={fav.id} recipe={fav} />)}
    </div>
  );
};

export default Favorites;
