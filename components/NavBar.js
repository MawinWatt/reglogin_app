import React, { useContext } from 'react'
import Link from 'next/link'
import { DataContext } from '../store/GlobalState'
import {useRouter} from 'next/router'


function NavBar() {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    const isActive = (r) => {
        if(r === router.pathname){
            return "active"
        }else{
            return ""
        }
    }

    const loggedRouter = () => {
        return(
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={auth.user.avatar} alt={auth.user.avatar} 
            style={{
                borderRadius: '50%', width: '30px', height: '30px',
                transform: 'translateY(-3px)', marginRight: '3px'
            }}/>
            {auth.user.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
            </div>
        </li> 
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

            <a className="navbar-brand" >Mawin</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <div className="navbar-nav" >

                {
                    Object.keys(auth).length === 0 
                    ? <li className="nav-item">
                        <Link href="/signin">              
                            <a style={{textDecoration: 'none'}} className={"nav-link" + isActive('/signin')} ><i className="fas fa-user" aria-hidden="true"></i> Signin</a>
                        </Link>
                    </li>
                    : loggedRouter()
                } 
            </div>
            </div>
        </div>
        </nav>
    )
}

export default NavBar
