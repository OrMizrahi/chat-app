import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doLogin, clearUserErrorMessage } from '../../redux/actions';
import Input from '../../components/form-components/Input';
import Password from '../../components/form-components/Password';
import Button from '../../components/form-components/Button';
import Message from '../../components/form-components/Message';

import './Auth.css';

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMessage] = useState('');

    const onUserNameChange = (e) => {
        const value = e.target.value;
        setUserName(value);
    };

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    useEffect(() => {
        if (user.isLoggedIn) history.push('/logout');
        dispatch(clearUserErrorMessage());
    }, [history, user.isLoggedIn, dispatch]);

    useEffect(() => {
        if (user.isLoggedIn) {
            history.push('/');
        }
    }, [user.isLoggedIn, history]);

    const onLoginSubmit = (e) => {
        e.preventDefault();

        if (userName.length < 2 || userName.length > 20) {
            setErrorMessage(
                'Please enter valid username, you exceed the 2-20 character limit'
            );
            return;
        }
        if (password.length < 2 || password.length > 20) {
            setErrorMessage(
                'Please enter valid password, you exceed the 2-20 character limit'
            );
            return;
        }

        //clear set state
        setErrorMessage('');
        //form valid, sending login request to the api
        dispatch(doLogin(userName, password));
    };

    const renderErrorMessage = () => {
        const { errorMessage } = user;
        if (!errorMessage && !errorMsg) return null;
        const message = errorMsg ? errorMsg : errorMessage;

        return (
            <Message>
                <h3>ERROR</h3>
                {message}
            </Message>
        );
    };

    return (
        <div id='login-container' className='ui container'>
            <form className='ui form'>
                <h1>
                    <i className='key icon'></i> Login to MaccabiChat
                </h1>
                {renderErrorMessage()}
                <Input
                    label='Enter Username'
                    name='userName'
                    autoComplete='username'
                    onChange={onUserNameChange}
                    value={userName}
                    placeholder='Username'
                />
                <Password
                    label='Enter Password'
                    onChange={onPasswordChange}
                    value={password}
                    placeholder='Password'
                />
                <Button onClick={onLoginSubmit}>Login</Button>
            </form>
        </div>
    );
};

export default Login;
