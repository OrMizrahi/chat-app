import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, doCreateRoom } from '../../redux/actions';
import Room from '../../components/Room';
import CreateRoom from '../../components/CreateRoom';
import './RoomManagement.css';

const RoomsManagement = ({ history }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const rooms = useSelector((state) => state.rooms);
    const renderRooms = () => {
        if (!rooms) return null;
        return (
            <div>
                {rooms.map((room) => {
                    return <Room key={room._id} {...room} />;
                })}
            </div>
        );
    };

    const onCreateRoom = (roomName) => {
        if (!roomName) window.alert('Please enter room name');
        else dispatch(doCreateRoom(user.token, roomName));
    };

    //Load Rooms
    useEffect(() => {
        //make administrator validation
        if (!user.isLoggedIn) history.push('/login');
        else if (!user.isAdmin) history.push('/');

        dispatch(fetchRooms());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id='room-managment' className='ui container'>
            <h1>Rooms Managment</h1>
            {renderRooms()}
            <div style={{ clear: 'both' }}></div>
            <hr />
            <CreateRoom onCreateRoom={onCreateRoom} />
        </div>
    );
};

export default RoomsManagement;
