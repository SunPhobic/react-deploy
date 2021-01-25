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
        if(e.target.className === "button prev" || e.target.className === "left"){
            if(!prevPage){
                return
            }else{
                setLoading(true)
                setCurrentPage(prevPage)
            }
            
            
        }else{
            if(nextPage === 'https://pokeapi.co/api/v2/pokemon/?offset=980&limit=20'){
                return
            }else{
                setLoading(true)
                setCurrentPage(nextPage)
            }
             
             
        }        
    }

    
   
    return (
        !loading
        ?<div>
            
            <div className="pagination">
                <div className="left" onClick={(e) => handleClick(e)}></div>
                <div className="button prev" name="prev" onClick={(e) => handleClick(e)}></div>
                <div className="button next" name="next" onClick={(e) => handleClick(e)}></div>
                <div className="right" onClick={(e) => handleClick(e)}></div>
            </div>
            <div className="container">
            {
               
                 pokeData.map((item, index) => <Card data={item} key={index} />)
                
                
           }
            </div>
           
           <div className="pagination">
               <div className="left" onClick={(e) => handleClick(e)}></div>
                <div className="button prev" name="prev" onClick={(e) => handleClick(e)}></div>
                <div className="button next" name="next" onClick={(e) => handleClick(e)}></div>
                <div className="right" onClick={(e) => handleClick(e)}></div>
            </div>
        </div>
        : <div className="poke-loading"><div className="lds-circle"><div></div></div></div>
    )
}

export default Pokemon
