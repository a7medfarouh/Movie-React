import React from 'react'
import { Link } from 'react-router-dom';

export function Navbar({crrUser ,clrUser}) {
  return <>
    <nav className="navbar navbar-expand-lg navbar-dark  bg-transparent">
        <div className="container-fluid">
            <Link className="navbar-brand fs-3" to="home">NOXE</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {crrUser?<><li className="nav-item">
                <Link className="nav-link" to="home">home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="movie">Movies</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="tvshow">TV Show</Link>
                </li>
              </>:''}
                
                
                
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                 <li className="nav-item">
                 <i className="fa-brands me-2  fa-facebook"></i>
                 <i className="fa-brands me-2  fa-twitter"></i>
                 <i className="fa-brands me-2  fa-spotify"></i>
                 <i className="fa-brands me-2  fa-instagram"></i>
                </li>
                {
                  crrUser?<><li className="nav-item">
                  <span onClick={clrUser}  className="nav-link" >logout</span>
                  </li>
                  
                  </>:
                  <><li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="register">Register</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="login">login</Link>
                  </li></>
                }
                
                
                
            </ul>
            </div>
        </div>
    </nav>
  
  
  </>
}
