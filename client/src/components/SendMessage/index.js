import { useState } from 'react';
import Button from '../form-components/Button';

const SendMessage = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const onClick = () => {
        onSendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <div className='ui input w80'>
                <input
                    type='text'
                    name='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === 'Enter' ? onClick() : undefined
                    }
                />
            </div>
            <Button onClick={onClick}>Add Message</Button>
        </div>
    );
};

export default SendMessage;
