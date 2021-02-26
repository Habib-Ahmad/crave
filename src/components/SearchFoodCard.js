import React, { useState, forwardRef } from 'react'
import './SearchFoodCard.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextTruncate from 'react-text-truncate'

const SearchFoodCard = forwardRef(({result}, ref) =>  {

    const [recipe, setRecipe] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function fetchRecipeData(){
        const options = {
            method: 'GET',
            url:` https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${result.id}/information`,
            headers: {
              'x-rapidapi-key': 'e5d5b7b20cmshd7efcea0cd1f698p1c05e1jsn54d8c360ab91',
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setRecipe(response.data)
          }).catch(function (error) {
              console.error(error);
          });
    }

    return (
        <div ref={ref} className="foodCard">
            <div className="foodCard__thumbnail" onClick={() => {fetchRecipeData();handleShow()}}>
                <img src={"https://spoonacular.com/recipeImages/"+result.image} alt="Food Thumbnail" />
                <TextTruncate
                    line={2}
                    element="h2"
                    truncateText="..."
                    text={result && result.title}
                />
                <p>Preparation Time: {result && result.readyInMinutes}mins</p>
                <p>Servings: {result && result.servings}</p>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {recipe && recipe.title} <br />
                        <small style={recipe && recipe.vegetarian?{display:"inline-flex"}:{display:'none'}}>{recipe && recipe.vegetarian?"Vegetarian":null}</small>&nbsp;
                        <small style={recipe && recipe.vegan?{display:"inline-flex"}:{display:'none'}}>{recipe && recipe.vegan?"Vegan":null}</small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={recipe && recipe.image} className="modal__img" alt="Food Thumbnail" />
                    <h3 className="modal__heading">Ingredients</h3>
                    {
                        recipe && recipe.extendedIngredients.map((item, index) => 
                            <p className="modal__ingredients">
                                {index+1}. <p style={{marginLeft:"5px"}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}: {item.amount}{item.unit}</p>
                            </p>
                        )
                    }
                    <h3>Instructions</h3>
                    {
                        recipe && recipe.analyzedInstructions.map(item => 
                            item.steps.map(index => 
                                <p className="modal__ingredients">
                                    {index.number}. <p style={{marginLeft:"5px"}}>{index.step}</p>
                                </p>
                            )
                            
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
    )
})

export default SearchFoodCard