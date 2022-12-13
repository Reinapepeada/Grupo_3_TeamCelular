import React from 'react';
import ChartRowUsers from './ChartRowUsers';
import { useEffect, useState} from 'react';

function ChartUsers (){

    const [users, setUsers] = useState([]) ;

	useEffect(() => {
		fetch(`http://localhost:3000/api/users`)
		.then(response => response.json())
		.then(data => {	
			setUsers(data.users)})
		.catch(error => console.error(error))
	}, []);

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>E-mail</th>
                           </tr>
                        </tfoot>
                        <tbody>
                            {
                            users.map( ( row , i) => {
                                return <ChartRowUsers { ...row} key={i}/>
                            
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}


export default ChartUsers;