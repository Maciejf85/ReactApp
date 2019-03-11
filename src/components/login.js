import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';



const Login = () => {

    return (
        <>
            <div className='login'>
                <div className='login__left' >
                    <Link to='/contact'>
                        <div className='login__content' >
                            <FontAwesomeIcon icon={faUserCircle} className="loginIcon" />
                            <div className='login__text dark'>Dodaj klienta</div>
                        </div>
                    </Link>
                </div>
                <div className='login__right'>
                    <div className='login__content'>
                        <FontAwesomeIcon icon={faUserCircle} className="loginIcon white" />
                        <div className='login__text white'>Poprzednie sesje</div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Login
