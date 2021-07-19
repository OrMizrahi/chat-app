import { useState } from 'react';
import Input from './Input'

const Password = (props) => {

    const [inputType, setInputType] = useState('password')

    const handleShowPassword = function (e) {
        const isChecked = e.target.checked;
        if (isChecked) setInputType('text');
        else setInputType('password');
    };

    return (

        <Input type={inputType} autoComplete="current-password" {...props}>
             <div style={{float:'right'}} className='ui basic label'>
                <div className="ui checkbox">
                    <input id='showPassword' onClick={handleShowPassword} type="checkbox" />
                    <label style={{cursor:'pointer'}} htmlFor="showPassword">Show Password</label>
                </div>
            </div>
        </Input>
      
    );
};

Password.defaultProps = {
    name: 'password'
};

export default Password;