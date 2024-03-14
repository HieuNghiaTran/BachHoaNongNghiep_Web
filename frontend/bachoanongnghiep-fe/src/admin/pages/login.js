import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Redirect, useNavigate } from 'react-router-dom'; // Change import statement
import isEmpty from 'validator/lib/isEmpty'
import { useForm } from "react-hook-form";
import '../css/App.css'
import { AuthContext } from '../context/authContext';
import { LoginAdminUser } from '../../services/userServices';

function Login(props) {

    const { addLocal, jwt, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const { handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    let history = useNavigate();

    const validateAll = () => {
        let msg = {}
        if (isEmpty(email)) {
            msg.email = "Email không được để trống"
        }
        if (isEmpty(password)) {
            msg.password = "Password không được để trống"
        }
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleLogin = () => {
        setLoading(true)
        const isValid = validateAll();
        if (!isValid) return
        login();
        setLoading(false)
    }

    const login = async () => {

        const response = await LoginAdminUser(email, password)
        console.log(response.data.msg)

        if (response.data.msg === "Đăng nhập thành công") {
           
            if (response.data.user.id_permission.permission === "admin") {
                
                addLocal(response.data.jwt, response.data.user)
            } else {
                setValidationMsg({ api: "Bạn không có quyền truy cập" })
            }

        } else
            setValidationMsg({ api: response.data.msg })
    }

    if (jwt && user && user.id_permission.permission === "admin") {
       
        return <Navigate to="/admin/dashboard" replace />;
    }


    return (
        <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative" style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(108,166,72,1) 1%, rgba(15,206,230,1) 71%, rgba(0,196,227,1) 95%, rgba(0,212,255,1) 100%)' }}>
            <div className="auth-box row border-right">
                <div className="col-lg-7 col-md-5 modal-bg-img " style={{ background: "#fff" }}>

                    <div className='m-auto'> <img src={require('../../components/images/logo.png')} className='m-auto w-100'></img></div>


                </div>
                <div className="col-lg-5 col-md-7 bg-white">
                    <div className="p-3">
                        <div className="text-center">
                            <img src={require("../images/icon.png")} alt="wrapkit" />
                        </div>
                        <h2 className="mt-3 text-center">Sign In</h2>

                        {
                            <p className="form-text text-danger">{validationMsg.api}</p>
                        }
                        <form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-dark" htmlFor="uname">Email</label>
                                        <input className="form-control" name="email" type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <p className="form-text text-danger">{validationMsg.email}</p>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-dark" htmlFor="pwd">Password</label>
                                        <input className="form-control" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                        <p className="form-text text-danger">{validationMsg.password}</p>
                                    </div>
                                </div>
                                <div className="col-lg-12 text-center">
                                    <button type="submit" className="btn btn-block btn-dark">Sign In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
