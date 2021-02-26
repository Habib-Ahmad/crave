import React, {useContext} from 'react'
import './Favorites.css'
import FoodCard from './FoodCard'
import {FavoriteContext} from '../FavoriteContext'

export default function Favorites() {

    const [favorites, setFavorites] = useContext(FavoriteContext)
    console.log(favorites)

    return (
        <div className="favorites">
            {favorites && favorites.map(favorite => <FoodCard key={favorite.id} recipe={favorite}/>)}
        </div>
    )
}
