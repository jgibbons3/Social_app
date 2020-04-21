import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { profileAction } from "./store/action/profileAction";


const App = (props) => {

  useEffect(() => {
    async function userProfile() {
      await props.dispatch(profileAction())
    }
    userProfile()
  }, [])

  return (
      <div className='pageDisplay'>
        <div>
          {props.children} 
        </div>
      </div>
  );
};

export default connect()(App);
