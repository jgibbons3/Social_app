import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { profileAction } from "./store/action/profileAction";


const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    async function userProfile() {
      await dispatch(profileAction())
    }
    userProfile()
  }, [dispatch])

  return (
      <div className='pageDisplay'>
        <div>
          {props.children} 
        </div>
      </div>
  );
};

export default connect()(App);
