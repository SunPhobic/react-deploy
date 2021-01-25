import React from 'react'
import './Card.css'

function Card(props) {

    
    return (
        <React.Fragment>
            <div className="card">
                <header className="card-header">
                    <h2 className="nombre">{props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1) }</h2>
                </header>
                <div className="card-img">
                    {
                        <img src={props.data.sprites.front_default} alt={props.data.name}/>
                        }
                </div>
                <div className="card-stats"> 
                    <ul className="stat-list">
                        <li>Type: {
                            props.data.types[0].type.name.charAt(0).toUpperCase() + props.data.types[0].type.name.slice(1)
                            }</li>
                        <li>Height: {props.data.height/10}m</li>
                        <li>weight: {props.data.weight/10}Kg</li>
                    </ul>
                </div>
                
            </div>
            
        </React.Fragment>
          
    )
}

export default Card
