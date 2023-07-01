import React from 'react';


import { NavLink } from 'react-router-dom'

export default function NavBar() {



    return (
        <>
            <nav className="navbar">
                <div className="navbar-container container">
                    <div className="hamburger-lines">
                    </div>
                    <ul className="navigation">
                        <li> <NavLink to="/">Stock</NavLink> </li>
                        <li> <NavLink to="/order">Order</NavLink>  </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}
