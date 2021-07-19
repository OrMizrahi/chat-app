import { useState } from 'react';
import Button from '../form-components/Button';
import Input from '../form-components/Input';

const CreateRoom = ({ onCreateRoom }) => {
    const [roomName, setRoomName] = useState(null);

    const onRoomChange = (e) => {
        setRoomName(e.target.value);
    };

    const onClick = () => {
        onCreateRoom(roomName);
        setRoomName('');
    };

    return (
        <div id='room-container' className='ui container'>
            <div className='ui form'>
                <h1>
                    <i className='american sign language interpreting icon'></i>{' '}
                    Create Room
                </h1>
                <Input
                    type='text'
                    style={{ marginBottom: '10px' }}
                    onKeyDown={(e) =>
                        e.key === 'Enter' ? onClick() : undefined
                    }
                    onChange={onRoomChange}
                    value={roomName}
                    placeholder='Room Name'
                />
                <Button onClick={onClick}>Create Room</Button>
            </div>
        </div>
    );
};

export default CreateRoom;
