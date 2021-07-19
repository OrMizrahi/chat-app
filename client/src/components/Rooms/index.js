import { Link } from 'react-router-dom';
import Room from '../Room';
import './RoomList.css';

const RoomList = ({ rooms }) => {
    if (!rooms) return null;

    return (
        <div id='room-list'>
            {rooms.map((room) => {
                return (
                    <Link key={room._id} to={`/chat/${room._id}`}>
                        <Room {...room} />
                    </Link>
                );
            })}
        </div>
    );
};

export default RoomList;
