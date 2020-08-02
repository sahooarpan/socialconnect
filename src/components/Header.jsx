import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../actions/auth'

const Header = ({auth,logOut}) => {

    const authLinks =(
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
          </li>
          { auth && !auth.loading && auth.isAuthenticated && auth.user && <li className="nav-item">
           <Link to={`/profile/${auth.user._id}`} className="nav-link text-white">
            <i className='fas fa-user' />{' '}{auth.user && auth.user.name}
            </Link>
          </li>}
          <li className="nav-item">
          <a className="nav-link text-white" onClick={logOut} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>

          </li>
          </ul>

    )
    
    const guestLinks=(
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link to="/login" className="nav-link text-white">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link text-white">Register</Link>
          </li>
          </ul>
    )
    
return (
        <nav role="navigation" className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className="container">
            <Link to='/' className="navbar-brand">
                <span className="pr-2">
                    <i className="fas fa-user-friends"></i>
                </span>
                FriendsConnect
            </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navLinks">
            <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navLinks">
        {!auth.loading && auth.isAuthenticated ?authLinks:guestLinks}
         </div>   
            </div>

        </nav>
    )
}

const mapStateToProps = state=>({
    auth:state.auth
})


export default connect(mapStateToProps,{logOut})(Header)
