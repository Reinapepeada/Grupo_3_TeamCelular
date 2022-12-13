import React from 'react';
import { useEffect, useState, useRef } from 'react';

function SearchUsers(){
const [users, setUsers] = useState([]) ;
const [keyword, setKeyword] = useState('');


	useEffect(() => {
		fetch(`http://localhost:3000/api/users`)
		.then(response => response.json())
		.then(data => {	
			setUsers(data.users.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase())))
			})
		.catch(error => console.error(error))
	}, [keyword])

	const inputTag = useRef();

	const searchUser = async e => {
		e.preventDefault();
		const inputValue = inputTag.current.value;
		setKeyword(inputValue);
		inputTag.current.value = '';
	}

	return(
		<div className="container-fluid">
			{
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={searchUser}>
								<div className="form-group">
									<label htmlFor="">Buscar Usuario:</label>
									<input type="text" className="form-control" ref={inputTag} />
								</div>
								<button className="btn btn-info">Buscar</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Nombre del usuario : {keyword}</h2>
						</div>
						{
							users.length > 0 && users.map((user, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{user.full_name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={user.profile_image}
														alt={user.full_name} 
														style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
													/>
												</div>
												<p>{user.email}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ users.length === 0 && <div className="alert alert-warning text-center">
						No se encontraron usuarios !!!</div>
					}
				</>
			}
		</div>
	)
}

export default SearchUsers;
