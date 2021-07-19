import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/actions';
import './Auth.css';

const Logout = ({ history }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    //check if user discconected, if so redirect to login
    useEffect(() => {
        if (!user.isLoggedIn) {
            history.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div id='login-container' className='ui container'>
            <h1>{user.nickName}, Are you sure that you want to logout?</h1>
            <button
                id='logout-button'
                onClick={() => dispatch(doLogout())}
                className='ui inverted red button'
            >
                LogOut now
            </button>
        </div>
    );
};

export default Logout;
