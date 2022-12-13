import React from 'react';
import ChartRowProducts from './ChartRowProducts';
import { useEffect, useState} from 'react';

function ChartProducts (){

    const [product, setProducts] = useState([]) ;

	useEffect(() => {
		fetch(`http://localhost:3000/api/products`)
		.then(response => response.json())
		.then(data => {	
			setProducts (data.products)})
		.catch(error => console.error(error))
	}, []);

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800" width="100%">
            Tabla de Productos
          </h5>
          </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Stock</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            product.map( ( row , i) => {
                                return <ChartRowProducts { ...row} key={i}/>
                            
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}


export default ChartProducts;