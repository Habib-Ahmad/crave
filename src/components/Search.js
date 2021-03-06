import React, { useState } from 'react'
import "./Search.css";
import axios from 'axios'
import SearchFoodCard from './SearchFoodCard'
import Accordion from 'react-bootstrap/Accordion'
import * as Icon from "react-bootstrap-icons";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function Search() {
    const [results, setResults] = useState([])
    const [queryInput, setQueryInput] = useState([])
    const [dietInput, setDietInput] = useState([])
    const [excludeInput, setExcludeInput] = useState([])
    const [typeInput, setTypeInput] = useState([])

    const updateQueryInput = (e) => {
        setQueryInput(e.target.value)
        if(e.key === 'Enter'){
            console.log('do validate');
        }
    }

    const updateDietInput = (e) => {
        setDietInput(e.target.value)
    }

    const updateExcludeInput = (e) => {
        setExcludeInput(e.target.value)
    }

    const updateTypeInput = (e) => {
        setTypeInput(e.target.value)
    }

    const handleClick= () =>{
        fetchRecipes(queryInput, dietInput, excludeInput, typeInput)
    }

    async function fetchRecipes(q,d,e,t){
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
            params: {
                query: q,
                diet: d,
                excludeIngredients: e,
                number: '1',
                offset: '0',
                type: t
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_SPOONACULAR_API_KEY,
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
            
        axios.request(options).then(function (response) {
            setResults(response.data.results)
        }).catch(function (error) {
            console.error(error);
        });      
    }
    
    return (
        <div className="search">
            <div className="search__bar__wrapper">
                <input className="search__bar" type="text" name="queryInput" placeholder="Search for a recipe e.g cheesecake, noodles" onChange={updateQueryInput} /><Icon.Search className="search__icon" onClick={handleClick} />
            </div>
            
            <Accordion className="search__filter">
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="btn btn-secondary text-white p-1 mb-2 mt-4">
                    <Icon.Funnel/> Filter
                </Accordion.Toggle>
                <Card  className="mb-3" style={{border:"none"}} bg="secondary" text="light">
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="search__filter__radioInput" onChange={updateDietInput}>
                                <input type="radio" name="dietInput" value="None" />
                                    <label>None</label>
                                <input type="radio" name="dietInput" value="Vegetarian" />
                                    <label>Vegetarian</label>
                                <input type="radio" name="dietInput" value="Vegan" />
                                    <label>Vegan</label>     
                            </div>

                            <label className="search__filter__label">Exclude:</label><input className="search__filter__input" type="text" name="excludeInput" placeholder="e.g gluten, egg" onChange={updateExcludeInput} value={excludeInput} /><br/>

                            <label className="search__filter__label">Type:</label><input className="search__filter__input" type="text" name="typeInput" placeholder="main course, side dish, dessert, appetizer" onChange={updateTypeInput} value={typeInput} /><br/>

                            
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            

            <div className="results">
                {results && results.map(result => <SearchFoodCard result={result} />)}
            </div>
        </div>
    )
}
