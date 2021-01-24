import React,{useState,useEffect} from 'react'
import './Card.css'

function Card(props) {

    const [pokeImg, setPokeImg] = useState('')

    useEffect(() => {

        let controller = new AbortController();
        const fetchPokeData = ()=>{
            fetch(props.url,{signal : controller.signal})
                .then(res => res.json())
                .then(data=>{
                    setPokeImg(data.sprites)
                })
                .catch(err => err.name === 'AbortError' ? null : console.log(err))
        }

        

        fetchPokeData();
        
        return () => {
            controller.abort()
        }
        // eslint-disable-next-line
    }, [props])

    

    
    
    return (
        <React.Fragment>
            <div className="card">
                <header className="card-header">
                    <h2 className="nombre">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h2>
                </header>
                <div className="card-img">
                    {pokeImg
                        ? <img src={pokeImg.front_default} alt={props.name}/>
                        :<p>LOADING...</p>}
                </div>
                <div className="card-stats"> 
                    <ul className="stat-list">
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                
            </div>
            
        </React.Fragment>
          
    )
}

export default Card
