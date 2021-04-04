import React from 'react';
import { Link } from 'react-router-dom';

const authSection = (user, setUser) => {
    const onClickLogout = () => {
        setUser(null);
    }

    if (!user) {
        return <>
            <Link to="/login">
                <button id='login-button'>
                    Login
                </button>
            </Link>
            <Link to="/register">
                <button id='register-button'>
                    Register
                </button>
            </Link>
        </>
    }
    return <>
        <div id='username'>
            {user.username}
        </div>
        <Link to='/logout'>
            <button onClick={onClickLogout}>
                Log Out
            </button>
        </Link>
    </>
}


const Header = ({ user, setUser }) => {

    return <>
        <section id="header">
            <div id='auth'>
                {authSection(user, setUser)}
            </div>
            <h1>Logo</h1>
            <div className='tabs'>
                <Link id="header-home" to="/">
                    Home
                </Link>
                <Link id="header-routines" to="/routines">
                    Routines
                </Link>
                <Link id="header-myroutines" to="/myroutines">
                    My Routines
                </Link>
                <Link id="header-activities" to="/activities">
                    Activities
                </Link>
            </div>
        </section>
    </>

}

export default Header;