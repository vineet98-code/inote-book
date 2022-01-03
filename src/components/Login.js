import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({email:"", password:""});
    let history = useHistory();
    
    
const handleSubmit = async (e) => {
    e.preventDefault();
    // Api call
        const response = await fetch(`http://localhost:4000/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        if(json){
            localStorage.setItem("token", json.token);
            props.showAlert("LoggedIn Sucessfully", "success");
            history.push('/');
        } else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <h2>Login to continue to iNotebook</h2>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={onChange} required/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
    )
}

export default Login
