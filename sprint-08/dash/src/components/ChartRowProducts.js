import React from 'react';


function ChartRowProducts(props){
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.description}</td>
                    <td>{props.stock}</td>      
                </tr>
            )
    }       

export default ChartRowProducts;