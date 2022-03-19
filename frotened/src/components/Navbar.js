import React, { useEffect } from 'react'

import { Link, useLocation, useHistory } from "react-router-dom";

export default function Navbar(props) {
    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/login");
    }
    let location = useLocation();

    useEffect(() => {
        // console.log(location.pathname)
    }, [location]);

return (

    <div>
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`}to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <Link className="bg-primary rounded mx-2" onClick={() => props.toggleMode('primary')} style={{ height: '20px', width: '20px', cursor: 'pointer' }}></Link>
                        <Link className="bg-danger rounded mx-2" onClick={() => props.toggleMode('danger')} style={{ height: '20px', width: '20px', cursor: 'pointer' }}></Link>
                        <Link className="bg-warning rounded mx-2" onClick={() => props.toggleMode('warning')} style={{ height: '20px', width: '20px', cursor: 'pointer' }}></Link>
                        <Link className="bg-success rounded mx-2" onClick={() => props.toggleMode('success')} style={{ height: '20px', width: '20px', cursor: 'pointer' }}></Link>
                    </div>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/register" role="button">SignUp</Link>
                    </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}

                    <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'} mx-4`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                    </div>
                </div>
            </div>
        </nav>
    </div>
)
}


