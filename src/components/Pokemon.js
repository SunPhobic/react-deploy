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

    const handleClick = (e) => {
        e.target.className === "button prev"
            ? prevPage != null ? setCurrentPage(prevPage) : setCurrentPage(currentPage)
            : nextPage != null ? setCurrentPage(nextPage) : setCurrentPage(currentPage)
    }

    
    
    return (
        <div>
            
            <div className="pagination">
                <div className="left"></div>
                <div className="button prev" name="prev" onClick={(e) => handleClick(e)}>prev</div>
                <div className="button next" name="next" onClick={(e) => handleClick(e)}>next</div>
                <div className="right"></div>
            </div>
            <div className="container">
            {
               pokeData
                ? pokeData.map((item, index) => <Card name={item.name} url={item.url} key={index} />)
                : 'LOADING...'
           }
            </div>
           
           <div className="pagination">
               <div className="left"></div>
                <div className="button prev" name="prev" onClick={(e) => handleClick(e)}>prev</div>
                <div className="button next" name="next" onClick={(e) => handleClick(e)}>next</div>
                <div className="right"></div>
            </div>
        </div>
    )
}

export default Pokemon
