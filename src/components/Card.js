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
                        <img src={props.img.front_default} alt={props.data.name}/>
                        }
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
