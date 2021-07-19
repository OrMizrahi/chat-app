import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//css
import './Header.css';
import HeaderUserStats from './HeaderUserStats';

const Header = () => {
    const user = useSelector((state) => state.user);
    const preProcess = useSelector((state) => state.preProcess);
    //show different components based on user status
    const renderUserStatus = () => {
        if (!preProcess) return null;

        if (user.isLoggedIn) {
            return <HeaderUserStats {...user} />;
        } else {
            return (
                <React.Fragment>
                    <Link to='/login' className='ui item'>
                        Login
                    </Link>
                    <Link to='/register' className='ui item'>
                        Register
                    </Link>
                </React.Fragment>
            );
        }
    };

    const renderAdminSection = () => {
        if (!user.isAdmin) return null;

        return (
            <React.Fragment>
                <Link to='/users' className='ui item'>
                    Users Management
                </Link>
                <Link to='/rooms' className='ui item'>
                    Rooms Management
                </Link>
            </React.Fragment>
        );
    };

    return (
        <header>
            <div className='ui container'>
                <div className='ui secondary menu'>
                    <Link to='/' className='ui item'>
                        Home
                    </Link>
                    {renderAdminSection()}
                    <div className='right menu'>{renderUserStatus()}</div>
                </div>
            </div>
            <hr />
        </header>
    );
};

export default Header;
