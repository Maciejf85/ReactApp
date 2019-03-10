import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';



const Login = () => {

    return (
        <>
            <div className='login'>
                <div className='login__left' >
                    <div className='login__content'>
                        <FontAwesomeIcon icon={faUserCircle} className="loginIcon" />
                        <div className='login__text dark'>Zaloguj się</div>
                    </div>
                </div>
                <div className='login__right'>
                    <div className='login__content'>
                        <FontAwesomeIcon icon={faUserCircle} className="loginIcon white" />
                        <div className='login__text white'>Zarejestruj się</div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Login
