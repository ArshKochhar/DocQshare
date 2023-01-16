import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const  RouterGuard = ({component: Component, ...rest}) => {
    
    function checkJWT () {
        let flag = false;
        localStorage.getItem('jwt_token') ? flag = true : flag = false;
        return flag;
    }

    return (
        <Route {...rest}
            render={props => {
                checkJWT() ?
                <Component {...props}/>
                :
                <Redirect to={{pathname: '/login'}} />
            }}
        />
    );
};

export default RouterGuard