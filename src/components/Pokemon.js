import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import Card from './Card'
import './Pokemon.css'

function Pokemon() {
    
    const [pokeData, setPokeData] = useState([])
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [pokeStats, setPokeStats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchNames = async ()=>{
            const response = await fetchData(currentPage)
            
            setPrevPage(response.previous)
            setNextPage(response.next)
            await pokemonData(response.results)
            setLoading(false)
        }
        fetchNames();
        // eslint-disable-next-line
    },[currentPage])
    

    const fetchData = (url) =>{
        return fetch(url).then(res=> res.json())
    }

    const getPokemon = (url) => {
        return fetch(url).then(res => res.json())
    }

    const pokemonData = async (data) => {
        let pokemon = await Promise.all(data.map(async pokemon => {
            let pokeRecord = await getPokemon(pokemon.url)
            return pokeRecord
        }))

        setPokeData(pokemon)
    }

    const handleClick = (e) => {
        e.target.className === "button prev" || e.target.className === "left"
            ? prevPage != null ? setCurrentPage(prevPage) : setCurrentPage(currentPage)
            : nextPage != null ? setCurrentPage(nextPage) : setCurrentPage(currentPage)
    }

    
   
    return (
        <div>
            
            <div className="pagination">
                <div className="left" onClick={(e) => handleClick(e)}></div>
                <div className="button prev" name="prev" onClick={(e) => handleClick(e)}></div>
                <div className="button next" name="next" onClick={(e) => handleClick(e)}></div>
                <div className="right" onClick={(e) => handleClick(e)}></div>
            </div>
            <div className="container">
            {
               !loading
                ? pokeData.map((item, index) => <Card data={item} key={index} />)
                : 'LOADING...'
           }
            </div>
           
           <div className="pagination">
               <div className="left" onClick={(e) => handleClick(e)}></div>
                <div className="button prev" name="prev" onClick={(e) => handleClick(e)}></div>
                <div className="button next" name="next" onClick={(e) => handleClick(e)}></div>
                <div className="right" onClick={(e) => handleClick(e)}></div>
            </div>
        </div>
    )
}

export default Pokemon
