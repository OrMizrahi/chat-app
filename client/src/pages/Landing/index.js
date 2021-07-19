import React, { useEffect } from 'react';
import RoomList from '../../components/Rooms';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../redux/actions';

const Landing = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const rooms = useSelector((state) => state.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const isLoggedIn = () => {
        return user.isLoggedIn;
    };

    const renderChatRooms = () => {
        //if user not logged in, don't show rooms
        if (!isLoggedIn())
            return (
                <div>
                    You need to register/login In order to get access to chat
                </div>
            );

        return (
            <div>
                <h4>Choose a room for chat</h4>
                <RoomList rooms={rooms} />
            </div>
        );
    };

    return (
        <div id='main-container' className='ui container'>
            <h1>Welcome to Maccabi Chat</h1>
            {isLoggedIn() ? renderChatRooms() : <div>Please sign in</div>}
        </div>
    );
};

export default Landing;
