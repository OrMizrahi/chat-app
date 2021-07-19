const Button = (props) => {
    return (
        <button {...props}>{props.children}</button>
    )
}

Button.defaultProps = {
    className:"ui inverted green button"
};

export default Button;
