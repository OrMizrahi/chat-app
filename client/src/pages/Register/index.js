import React, { useEffect } from 'react';
import { doCreateUser, clearUserErrorMessage } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import Input from '../../components/form-components/Input';
import Password from '../../components/form-components/Password';
import Button from '../../components/form-components/Button';
import Message from '../../components/form-components/Message';

import './Auth.css';

const Register = ({ history }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //check if register success or you alread logged in
    useEffect(() => {
        if (user.isLoggedIn) {
            history.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    //clear error messages if there are any
    useEffect(() => {
        dispatch(clearUserErrorMessage());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderErrorMessage = () => {
        if (_.isEmpty(errors) && !user.errorMessage) return null;
        return (
            <Message>
                <h3>Errors</h3>
                <p>{user.errorMessage}</p>
                <p>{errors.userName?.message}</p>
                <p>{errors.password?.message}</p>
                <p>{errors.nickName?.message}</p>
            </Message>
        );
    };

    const onSubmit = (data) => {
        dispatch(doCreateUser(data));
    };

    return (
        <div id='login-container' className='ui container'>
            <form onSubmit={handleSubmit(onSubmit)} className='ui form'>
                <h1>
                    <i className='american sign language interpreting icon'></i>{' '}
                    Register to MaccabiChat
                </h1>

                <Input
                    label='* Enter User Name'
                    autoComplete='username'
                    validation={{
                        ...register('userName', {
                            required: 'Username Required',
                            minLength: {
                                value: 2,
                                message: 'Username minimum length:2',
                            },
                            maxLength: {
                                value: 10,
                                message: 'Username maximum length:10',
                            },
                        }),
                    }}
                />

                <Input
                    label='* Enter Nickname'
                    validation={{
                        ...register('nickName', {
                            required: 'Nickname Required',
                            maxLength: {
                                value: 20,
                                message: 'Nickname maximum length:20',
                            },
                        }),
                    }}
                />

                <Password
                    label='* Enter Password'
                    validation={{
                        ...register('password', {
                            required: 'Password Required',
                            minLength: {
                                value: 4,
                                message: 'Password minimum length:4',
                            },
                            maxLength: {
                                value: 16,
                                message: 'Password maximum length:16',
                            },
                        }),
                    }}
                />

                <Button type='submit'>Register</Button>
                {renderErrorMessage()}
            </form>
        </div>
    );
};

export default Register;
