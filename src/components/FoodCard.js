// import React, { useState, forwardRef } from 'react'
import React, { useContext, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextTruncate from "react-text-truncate";
import { AddFavorite } from "../action";
import { FavoriteContext } from "../FavoriteContext";
import "./FoodCard.css";
// const FoodCard = forwardRef(({recipe, ref, ...props}) =>  {\

const FoodCard = ({ recipe }) => {
  const { favourites, dispatch } = useContext(FavoriteContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    let newList = favourites?.data;
    if (recipe.isAdded === true) {
      const index = newList.indexOf(recipe);
      newList.splice(index, 1);
      dispatch(AddFavorite(newList));
      recipe.isAdded = false;
    } else {
      recipe.isAdded = true;
      dispatch(AddFavorite([...favourites.data, recipe]));
    }
  }

  return (
    // <div ref={ref} className="foodCard">
    <div className="foodCard">
      <div className="foodCard__thumbnail" onClick={handleShow}>
        <img src={recipe && recipe.image} alt="Food Thumbnail" />

        <TextTruncate line={2} element="h2" truncateText="..." text={recipe && recipe.title} />

        <p>Preparation Time: {recipe && recipe.readyInMinutes}mins</p>

        <p>Servings: {recipe && recipe.servings}</p>
      </div>

      <p onClick={handleClick}>{recipe.isAdded ? (<Icon.SuitHeartFill color="red" />) : (<Icon.SuitHeart />)}</p>
      
      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>
            {recipe.title} <br />
            <small style={recipe && recipe.vegetarian ? { display: "inline-flex" }: { display: "none" }}>
                {recipe && recipe.vegetarian ? "Vegetarian" : "nothing to see"}
            </small>&nbsp;
            <small style={recipe && recipe.vegan ? { display: "inline-flex" } : { display: "none" }}>
                {recipe && recipe.vegan ? "Vegan" : "nothing to see"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={recipe.image} className="modal__img" alt="Food Thumbnail" />
          <h3 className="modal__heading">Ingredients</h3>
          {recipe?.extendedIngredients?.map((item, index) => (
            <p className="modal__ingredients" key={index}>{index + 1}.{" "}
              <p style={{ marginLeft: "5px" }}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:{" "}
                {item.amount}
                {item.unit}
              </p>
            </p>
          ))}
          <h3>Instructions</h3>
          {recipe.analyzedInstructions?.map((item) =>
            item?.steps?.map((index) => (
              <p className="modal__ingredients" key={index.numbe}>
                {index.number}.{" "}
                <p style={{ marginLeft: "5px" }}>{index.step}</p>
              </p>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FoodCard;
