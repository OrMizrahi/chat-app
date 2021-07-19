import React from 'react'
import { Link } from "react-router-dom";

const HeaderUserStats = ({isAdmin,nickName}) => {

    return (
        <React.Fragment>
                  <span className="ui teal label"> {!isAdmin ? <span><i className="user icon"></i></span> : <span><i className="user secret icon"></i> <span  className="ui red ribbon label">Admin</span></span> } {nickName}</span>
                  <Link to="/logout" className="ui item">Logout</Link>
        </React.Fragment>
    )

};

export default HeaderUserStats;