import React from 'react';
import { initPreProcess } from '../redux/actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Landing from '../pages/Landing';
import Loading from './Loading';
import Logout from '../pages/Logout/Logout';
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import Header from './Header/';
//Admin section
import UsersManagement from '../pages/UsersManagement';
import RoomsManagement from '../pages/RoomsManagement';
import Login from '../pages/Login';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();
    const preProcess = useSelector((state) => state.preProcess);
    dispatch(initPreProcess());
    return (
        <Router history={history}>
            <Header history={history} />
            {preProcess ? (
                <Switch>
                    <Route path='/' exact component={Landing} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/logout' exact component={Logout} />
                    <Route path='/users' exact component={UsersManagement} />
                    <Route path='/rooms' exact component={RoomsManagement} />
                    <Route path='/chat/:id' exact component={Chat} />
                    <Route
                        path='*'
                        component={() => (
                            <div className='ui container'>
                                <h1>Page not found 404</h1>
                            </div>
                        )}
                    />
                </Switch>
            ) : (
                <Loading />
            )}
        </Router>
    );
};
export default App;
