import React from 'react';
import image from '../assets/images/logo.png';
import {Link,Route,Routes} from 'react-router-dom';

import ContentWrapper from './ContentWrapper';
import LastUserInDb from './LastUserInDb';
import LastProductInDb from './LastProductInDb';
import ChartProducts from './ChartProducts';
import ChartUsers from './ChartUsers';
import NotFound from './NotFound';

function SideBar(){
    return(
        <>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100 h-60" src={image} alt="Mi Celular - Grupo 3"/>
                    </div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard Portada</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Mi Celular - Grupo 3</div>


                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="LastUserInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Último Usuario</span></Link>
                </li>

                                {/*<!-- Nav Item - Charts -->*/}
                                <li className="nav-item">
                    <Link className="nav-link" to="LastProductInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Último Producto</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/ChartProducts">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tabla Productos</span></Link>
                </li>

                                <li className="nav-item">
                    <Link className="nav-link" to="/ChartUsers">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tabla Usuarios</span></Link>
                </li>


                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            
            <Routes>
                <Route  exact path='/' element = {<ContentWrapper/>} />         
                <Route  path='/LastUserInDb' element = {<LastUserInDb/>} />
                <Route  path='/LastProductInDb' element = {<LastProductInDb/>} />
                <Route  path='/ChartProducts' element = {<ChartProducts/>} />
                <Route  path='/ChartUsers' element = {<ChartUsers/>} />
                <Route  path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
export default SideBar;