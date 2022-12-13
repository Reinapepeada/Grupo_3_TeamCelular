import React from 'react';
import { useEffect, useState} from 'react';


function LastUserInDb(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/users`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.users[data.users.length-1])
            })
            .catch(error => console.error(error))
    }, [])


    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo Usuario Creado: {users.full_name}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src={`http://localhost:3000/img/users/${users.profile_image}`}  alt=" Imágen usuario "/>
                    </div>
                    <p>{users.email}</p>
                </div>
            </div>
        </div>
    )
}

export default LastUserInDb;
