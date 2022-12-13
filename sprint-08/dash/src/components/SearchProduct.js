import React from 'react';
import { useEffect, useState, useRef } from 'react';

function SearchProduct(){

const [keyword, setKeyword] = useState('');

const [product, setProduct] = useState([]) ;

	useEffect(() => {
		fetch(`http://localhost:3000/api/product`)
		.then(response => response.json())
		.then(data => {	
			setProduct(data.product.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase())))
			})
		.catch(error => console.error(error))
	}, [keyword])

	const inputTag = useRef();

	const searchproduct = async e => {
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
							<form method="GET" onSubmit={searchproduct}>
								<div className="form-group">
									<label htmlFor="">Buscar product:</label>
									<input type="text" className="form-control" ref={inputTag} />
								</div>
								<button className="btn btn-info">Buscar</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Nombre del Producto : {keyword}</h2>
						</div>
						{
							product.length > 0 && product.map((product, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{product.name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={`http://localhost:3000/img/${product.image}`} 
														alt={product.name} 
														style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
													/>
												</div>
												<p>{product.description}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ product.length === 0 && <div className="alert alert-warning text-center">
					No se encontraron productos !!!</div>
					}
				</>
			}
		</div>
	)
}

export default SearchProduct;
