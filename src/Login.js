import React, {useState} from "react";
import {login} from "./store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _login = async(ev) => {
        ev.preventDefault();
        const credentials = {
            username,
            password
        }
        try{
            dispatch(login(credentials));
            navigate('/products')
        }
        catch(er){
            console.log(er);
        }
    }
    return(
        <form onSubmit={_login}>
            <input value={username} onChange={ev => setUsername(ev.target.value)}/>
            <input value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    )
}

export default Login;
