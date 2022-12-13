import React from "react";
import imagenFondo from '../assets/images/error404.webp';

function NotFound(){
    return(
        <div className="text-center">
            <h1>404 Not Found</h1>
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 60 +'rem'}} src={imagenFondo} alt=" Star Wars - 404 "/>
        </div>
        
    )
}
export default NotFound;