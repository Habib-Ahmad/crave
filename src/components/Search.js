import React, { useEffect, useState } from 'react'
import "./Search.css";
import axios from 'axios'
import SearchFoodCard from './SearchFoodCard'

export default function Search() {
    const [results, setResults] = useState([])
    var query
    var diet
    var exclude
    var type


    useEffect(async() => {
        fetchRecipes()
        // fetchRecipes(query, diet, exclude, type)
    }, [])

    async function fetchRecipes(q, d, e, t){
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
            params: {
                query: 'vegetarian',
                diet: '',
                excludeIngredients: 'coconut',
                intolerances: 'egg, gluten',
                number: '4',
                offset: '0',
                type: 'main course'
                // query: q,
                // diet: d,
                // excludeIngredients: e,
                // number: '4',
                // offset: '0',
                // type: t
            },
            headers: {
                'x-rapidapi-key': '',
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
            
        axios.request(options).then(function (response) {
            setResults(response.data.results);
        }).catch(function (error) {
            console.error(error);
        });      
    }
    
    return (
        <div>
            <label>Search:</label><input type="text" placeholder="e.g cheesecake, noodles"/><br/>

            <input type="radio" id="male" name="gender" value="none"/>
            <label for="male">None</label><br/>
            <input type="radio" id="female" name="gender" value="vegetarian"/>
            <label for="female">vegetarian</label><br/>
            <input type="radio" id="other" name="gender" value="vegan"/>
            <label for="other">Vegan</label><br/>

            <label>Exclude:</label><input type="text" placeholder="e.g gluten, egg"/><br/>

            <label>Type:</label><input type="text" placeholder="main course, side dish, dessert, appetizer"/><br/>

            <div className="results">                
                {results && results.map(result => <SearchFoodCard result={result} />)}
            </div>
        </div>
    )
}
