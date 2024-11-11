import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const logInUser = () => {
        setEmailError(''); // Reset error messages on each attempt
        setPasswordError('');

        // Input validation
        if (email.length === 0) {
            setEmailError("Email is required");
            return;
        }
        if (password.length === 0) {
            setPasswordError("Password is required");
            return;
        }

        // Make API request if inputs are valid
        axios.post('http://127.0.0.1:5000/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            navigate("/");
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response) {
                if (error.response.status === 401) {
                    setPasswordError("Wrong password"); // Set error under password input
                } else if (error.response.status === 404) {
                    setEmailError("Email not found"); // Set error under email input
                }
            }
        });
    };

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                                </div>

                                {/* Email Field */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />
                                    {emailError && <span style={{ color: 'red', fontSize: '0.875rem' }}>{emailError}</span>}
                                </div>

                                {/* Password Field */}
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                    />
                                    {passwordError && <span style={{ color: 'red', fontSize: '0.875rem' }}>{passwordError}</span>}
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={logInUser}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account? <a href="/register" className="link-danger">Register</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
