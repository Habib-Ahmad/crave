import React, { useState, createContext,useEffect } from 'react'

export const FavoriteContext = createContext()

export const FavoriteProvider = props => {
    const [favorites, setFavorites] = useState([])
    
    useEffect(() => {
        console.log(favorites);
    }, [])

    return(
        <FavoriteContext.Provider value={"Working!"}>
            {props.children}
        </FavoriteContext.Provider>
    )
}