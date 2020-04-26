import { connect } from "react-redux";
import React, { useState } from "react";
import { loginAction } from "../../store/action/loginAction";
import "./Login.css";


const Login = props => {
    let [state, setState] = useState({
        email: '',
        password: '',
    });

    let [message, setMessage] = useState(false)

    const handleChange = e => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await props.dispatch(loginAction(state.email, state.password))
        if(Number(response.status) === 200){
            props.history.push("/")
        }
        if (Number(response.status) === 401) {
            setMessage('Incorrent email or password, please try again')
        }
    }

    return(
        <div className='mainContainerLogin'>
            <div className='loginBackground'>
                <div className='LoginBackgroundLayer'>
                    <div className='loginFraseWrapper'>
                        <div className='logoApp'> 
                        </div>
                        <div className='loginFrase'>
                            <p>Login to connect with friends all around the world</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='loginForm'>
                <div className='loginWrapper'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className='loginInput' type='text' name='email' value={state.email} placeholder='email' 
                            onChange={handleChange}></input>
                        </div>
                        <div>
                            <input className='loginInput' type='password' name='password' value={state.password} 
                            placeholder='password' onChange={handleChange}></input>
                        </div>
                        <div>
                            <p>{message}</p>
                        </div>
                        <div data-testid="login_button">
                            <button className='buttonLogin' type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default connect()(Login);