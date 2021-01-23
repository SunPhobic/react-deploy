import React,{useState,useEffect} from 'react'

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
                <h2>{props.name}</h2>
                {pokeImg
                    ? <img src={pokeImg.front_default} alt={props.name}/>
                    :<p>LOADING...</p>}
            </div>
            
        </React.Fragment>
          
    )
}

export default Card
