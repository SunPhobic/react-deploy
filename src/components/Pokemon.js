import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import Card from './Card'

function Pokemon() {
    
    const [pokeData, setPokeData] = useState([])
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    
    useEffect(()=>{
        
        const fetchData = () => {
            fetch(currentPage)
                .then(res=> res.json())
                .then(data=>{
                    setPokeData(data.results)
                    setPrevPage(data.previous)
                    setNextPage(data.next)
                })
                .catch(err => console.log(err))
        }
        
        fetchData();
        // eslint-disable-next-line
    },[currentPage])

    

    
    
    return (
        <div>
           {
               pokeData
                ? pokeData.map((item, index) => <Card name={item.name} url={item.url} key={index} />)
                : 'LOADING...'
           }
        </div>
    )
}

export default Pokemon
