import React from 'react';


function ChartRowUsers(props){
    return (
                <tr>
                    <td>{props.full_name}</td>
                    <td>{props.email}</td>
                </tr>
            )
    }       

export default ChartRowUsers;