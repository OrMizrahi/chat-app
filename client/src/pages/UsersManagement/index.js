import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, doDeleteUser } from '../../redux/actions';
import Search from '../../components/Search';
import User from '../../components/User';
import './UserManagement.css';
import _ from 'lodash';
import Button from '../../components/form-components/Button';

const UsersManagement = ({ history }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const usersManagment = useSelector((state) => state.usersManagment);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!user.isLoggedIn) history.push('/login');
        else if (!user.isAdmin) history.push('/');

        //fetch users
        dispatch(fetchUsers(user.token));
    }, [dispatch, history, user.isAdmin, user.isLoggedIn, user.token]);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearchSubmit();
        }
    };

    const onSearchSubmit = () => {
        if (_.isEmpty(query)) {
            dispatch(fetchUsers(user.token));
            return;
        }
        const query2 = {
            userName: { $regex: `${query}` },
        };

        dispatch(fetchUsers(user.token, query2));
    };

    const onDeleteCallback = (_id) => {
        dispatch(doDeleteUser(user.token, _id));
        setQuery('');
    };

    const renderUsersList = () => {
        if (!usersManagment) return null;
        return (
            <ul>
                {usersManagment.map((u) => {
                    //dont show myself
                    if (u._id === user._id) return null;

                    //return user details
                    return (
                        <User
                            key={u._id}
                            onDeleteCallback={onDeleteCallback}
                            {...u}
                        />
                    );
                })}
            </ul>
        );
    };

    return (
        <div id='user-managment' className='ui container'>
            <h1>Users Managment</h1>
            <div className='search-container'>
                <Search
                    onKeyDown={handleKeyDown}
                    value={query}
                    onChange={onSearchChange}
                />
            </div>
            <Button
                className='ui button search-button'
                onClick={onSearchSubmit}
            >
                Search
            </Button>
            <hr />
            {renderUsersList()}
        </div>
    );
};

export default UsersManagement;
