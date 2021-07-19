
const Input = (props) => {

    const { label, className, validation } = props;
    const inputProps = {...props, children:undefined, className:undefined  }

    //if validation refernce is null, we need to set some value 
    if (!validation)  inputProps.value = props.value || '';

    return (
        <div className={`field ${className ? className : ''}`}>
            <label>{label}</label>
            <input  
            {...inputProps}
            {...validation}
            />
            {props.children}
        </div>
    )

};
Input.defaultProps ={
    type:'text'
}

export default Input;