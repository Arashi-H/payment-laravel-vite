import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import '../../../css/style.scss';
import { useWindowSize } from "../../utils/Helper";

import agent from '../../api/'

import {
  startAction,
  endAction,
  showToast,
} from '../../actions/common'

import {
  login
} from '../../actions/auth'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [displayState, setDisplayState] = useState('login')
  const [loginData, setLoginData] = useState({email: '', password: ''})
  const [signupData, setSignupData] = useState({first_name: '', last_name: '', email: '', password: '', password_confirmation: ''})

  const submitLogin = async () => {
    // email === '' ? setEmailInputError(true) : setEmailInputError(false)
    // password === '' ? setPasswordInputError(true) : setPasswordInputError(false)
    // if (email !== '' && password !== '') {
        console.log('pressed longin')
      let res
      dispatch(startAction())
      try {
        res = await agent.auth.login(loginData.email, loginData.password)
        console.log('response is ', res)
        dispatch(endAction())
        if (res.data.success) {
          localStorage.setItem('token', res.data.token)
          dispatch(showToast('success', res.data.message))
          res.data.user.role = res.data.role
          res.data.user.token = res.data.token
          dispatch(login(res.data.user))
          console.log("res.data.user=", res.data.user)
          navigate("/home");
        }
      } catch (error) {
        if (error.response != undefined) {
          if (error.response.status >= 400 && error.response.status <= 500) {
            dispatch(endAction())
            dispatch(showToast('error', error.response.data.message))
          }
        }
      }
    // }
  }

  const submitRegister = async () => {
    // email === '' ? setEmailInputError(true) : setEmailInputError(false)
    // password === '' ? setPasswordInputError(true) : setPasswordInputError(false)
    // if (email !== '' && password !== '') {

      // const reEmail = convertParameter(email)
      // const rePassword = convertParameter(password)

      let res
      dispatch(startAction())
      try {
        res = await agent.auth.register(signupData.first_name, signupData.last_name, signupData.email, signupData.password, signupData.password_confirmation)
        dispatch(endAction())
        if (res.data.success) {
          setDisplayState('login')
          dispatch(showToast('success', res.data.message))
        }
      } catch (error) {
        if (error.response != undefined) {
          if (error.response.status >= 400 && error.response.status <= 415) {
            dispatch(endAction())
            dispatch(showToast('error', error.response.data.message))
          }
        }
      }
  }

  return (
    <div>
      <div>
        {
          displayState === 'login' &&
        //   <div className={styles.login_box}>
        //     <div className={styles.login_label}>Sign In</div>
        //     <input className={styles.login_input} value={loginData.email} onChange={(e) => setLoginData((old) => {return({...old, email: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitLogin() }} placeholder='Email' type='email'/>
        //     <input className={styles.login_input} value={loginData.password} onChange={(e) => setLoginData((old) => {return({...old, password: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitLogin() }} placeholder='Password' type='password'/>
        //     <div className={styles.login_option_container}>
        //       <div className={styles.check_container}>
        //         <div className={styles.check}>
        //           <input className={styles.remember_check} type="checkbox" onChange={() => console.log('click remember checkbox')} />
        //         </div>
        //         <div className={styles.remember_text}>Remember me</div>
        //       </div>
        //       <Link className={styles.forgot_btn} to={'/forgot'}>Forgot Password?</Link>
        //     </div>
        //     <div className={styles.login_action_btn_container}>
        //       <button className={styles.login_btn} onClick={() => submitLogin()}>Login</button>
        //       <button className={styles.signup_btn} onClick={() => setDisplayState('signup')}>Sign up</button>
        //     </div>
        //   </div>
          <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"/>
                    <span className="r s"/>
                    <span className="r s"/>
                    <span className="r"/>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon"/>
                        </div>
                        <h3 className="mb-4">Login</h3>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData((old) => {return({...old, email: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitLogin() }}/>
                        </div>
                        <div className="input-group mb-4">
                            <input type="password" className="form-control" placeholder="password" value={loginData.password} onChange={(e) => setLoginData((old) => {return({...old, password: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitLogin() }}/>
                        </div>
                        <div className="form-group text-left">
                            <div className="checkbox checkbox-fill d-inline">
                                <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                    <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                            </div>
                        </div>
                        <button className="btn btn-primary shadow-2 mb-4" onClick={submitLogin}>Login</button>
                        {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p> */}
                        <p className="mb-0 text-muted">Don’t have an account? <a onClick={() => setDisplayState('signup')}>Signup</a></p>
                    </div>
                </div>
            </div>
        </div>
        }

        {
          displayState === 'signup' &&
        //   <div className={styles.signup_box}>
        //     <div className={styles.signup_label}>Sign Up</div>
        //     <input className={styles.signup_input} value={signupData.first_name} onChange={(e) => setSignupData((old) => {return({...old, first_name: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitRegister() }} placeholder='First Name' type='text'/>
        //     <input className={styles.signup_input} value={signupData.last_name} onChange={(e) => setSignupData((old) => {return({...old, last_name: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitRegister() }}  placeholder='Last Name' type='text'/>
        //     <input className={styles.signup_input} value={signupData.email} onChange={(e) => setSignupData((old) => {return({...old, email: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitRegister() }}  placeholder='Email' type='email'/>
        //     <input className={styles.signup_input} value={signupData.password} onChange={(e) => setSignupData((old) => {return({...old, password: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitRegister() }}  placeholder='Password' type='password'/>
        //     <input className={styles.signup_input} value={signupData.password_confirmation} onChange={(e) => setSignupData((old) => {return({...old, password_confirmation: e.target.value})})} onKeyPress={(e) => { if (e.keyCode === 13 || e.charCode === 13) submitRegister() }}  placeholder='Password Confirmation' type='password'/>
        //     <div className={styles.signup_action_btn_container}>
        //       <button className={styles.signup_btn}  onClick={() => submitRegister()}>Register</button>
        //       <button className={styles.login_btn} onClick={() => setDisplayState('login')}>Sign in</button>
        //     </div>
        //   </div>
        <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"/>
                    <span className="r s"/>
                    <span className="r s"/>
                    <span className="r"/>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-user-plus auth-icon"/>
                        </div>
                        <h3 className="mb-4">Sign up</h3>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group mb-4">
                            <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group text-left">
                            <div className="checkbox checkbox-fill d-inline">
                                <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                    <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                            </div>
                        </div>
                        <button className="btn btn-primary shadow-2 mb-4" onClick={signup}>Sign up</button>
                        <p className="mb-0 text-muted">Allready have an account? <a onClick={() => setDisplayState('login')}>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
        }
      </div>
    </div >
  )
}

export default Login
