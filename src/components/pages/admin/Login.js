import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css/sb-admin-2.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post('http://localhost:4000/admin-login'
            const response = await axios.post('${process.env.BASE_API_URL}/admin-login', {
                username,
                password,
            });

            if (response.data.message === 'Login successful') {
                const token = response.data.token;
                const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes
                localStorage.setItem('token', token);
                localStorage.setItem('expirationTime', expirationTime);

                navigate('/admin');
            } else {
                setError('Invalid username or password!');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Error during login. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            {error && (
                                                <div className="alert alert-danger text-center" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <form className="user" onSubmit={handleLogin}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user" id="exampleInputUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" value={password}
                                                        onChange={(e) => setPassword(e.target.value)} required />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;
