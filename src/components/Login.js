
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();


    const Handlesubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert(" Logged in Successfully","success")
            navigate("/");
            
        } else {
            props.showAlert(" Invalid Credintials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container col-md-5 mt-3">
            <h2>Log In to continue </h2>
                <form onSubmit={Handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div >
    )
}
export default Login