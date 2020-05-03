import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      authenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  
  const mapStatetoProps = state => {
    return{
        authenticated: state.loginReducer.authenticated,
    }
}

export default connect(mapStatetoProps)(PrivateRoute)
