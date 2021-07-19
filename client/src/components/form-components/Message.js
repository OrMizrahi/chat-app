
const Message = (props) => {

    return (
        <div className={`ui message ${props.className ? props.className : ''}`}>
            <p>{props.children}</p>
        </div>
    )
}
export default Message;