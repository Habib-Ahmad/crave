import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Explore.css";
import FoodCard from "./FoodCard";

export default function Explore() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  async function fetchRandomRecipes() {
    // setRecipes(null)
    const options = {
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
      params: { number: "4", tags: "" },
      headers: {
        "x-rapidapi-key": "e5d5b7b20cmshd7efcea0cd1f698p1c05e1jsn54d8c360ab91",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let doRecipe = response.data.recipes;
        doRecipe.isAdded = false;
        setRecipes(doRecipe);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="explore">
      {recipes &&
        recipes.map((recipe) => <FoodCard key={recipe.id} recipe={recipe} />)}
    </div>
  );
}
