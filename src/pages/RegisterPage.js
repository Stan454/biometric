import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Validation for the password input
    const validatePassword = (password) => {
        if (password.length <= 5) {
            return "Password must be longer than 5 characters.";
        }
        if (!/\d/.test(password)) {
            return "Password must contain at least one number.";
        }
        return "";
    };

    const registerUser = () => {
        setEmailError(''); // Reset error messages on submission
        setPasswordError('');

        // Perform password validation
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return; // Exit the function if password is invalid
        }

        // Proceed with form submission if password is valid
        axios.post('http://127.0.0.1:5000/signup', {
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((error) => {
            console.log(error, 'error');
            if (error.response) {
                if (error.response.status === 409) {
                    setEmailError("Email already exists");
                } else if (error.response.status === 401) {
                    setEmailError("Invalid email address");
                }
            }
        });
    };

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
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
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => registerUser()}>Sign Up</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Login to your account <a href="/login" className="link-danger">Login</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg" className="img-fluid" alt="Sample image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
