import React, { Component } from 'react'
import FormValidator from '../../_validators/FormValidators';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Unlock, User } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import { changeLoggedIn } from '../../_actions/user.actions';

 class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,

            username: "",
            password: "",
            loginSubmitted: false,

            user:{
                firstName : "",
                lastName: "",
                email: "",
                userTypeId: 1,
                password: "",
                confirmPassword: "",
            },
            regSubmitted: false,

            validationLogin : this.validatorLogin.valid(),
            validationReg :this.validatorReg.valid(),

        }
        this.validatorLogin = new FormValidator([
            {
                field : "userName",
                method: "isEmpty",
                validWhen : false,
                message : "userName is required"
            },
            {
                field : "userName",
                method: "isEmpty",
                validWhen : true,
                message : "Please enter a valid User Name"
            },
            {
                field : "password",
                method: "isEmpty",
                validWhen : false,
                message : "password is required"
            }
        ]);
        this.validatorReg = new FormValidator([
            {
                field : "firstName",
                method: "isEmpty",
                validWhen : false,
                message : "firstName is required"
            },
            {
                field : "lastName",
                method: "isEmpty",
                validWhen : false,
                message : "lastName is required"
            },
            {
                field : "email",
                method: "isEmpty",
                validWhen : false,
                message : "Email id is required"
            },
            {
                field : "email",
                method: "isEmpty",
                validWhen : false,
                message : "Please enter valid Email id"
            },
            {
                field : "userName",
                method: "isEmpty",
                validWhen : true,
                message : "Please enter a valid User Name"
            },
            {
                field : "password",
                method: "isEmpty",
                validWhen : false,
                message : "password is required"
            },
            {
                field : "confirmPassword",
                method: "isEmpty",
                validWhen : false,
                message : "confirm password is required"
            },
            {
                field : "confirmPassword",
                method: this.passwordMatch,
                validWhen : true,
                message : "password & confirm password must be same"
            }
        ])
    this.handleLogin = this.handleLogin.bind(this);
    this.handleReg = this.handleReg.bind(this)
    }
    tabChange(index) {
        this.setState({
     tabIndex : index
        })
    }
    passwordMatch = (confirmPass, state) =>{
return state.user.password === confirmPass
    }
 handleLoginInput =(e) =>{
e.preventDefault();
const {name,value} = e.target.value
this.setState({
[name] : value
})
 }
 clearLoginForm = () =>{
    this.setState({
        username: "",
        password: "",
    });
 }
 handleRegInput =(e) =>{
    e.preventDefault();
    const {name,value} = e.target.value;
    this.setState({
        user: {
            ...user, 
            [name] : value 
        }
        })
 }
 clearRegForm = () =>{
this.setState({
    user:{
        firstName : "",
        lastName: "",
        email: "",
        userTypeId: 1,
        password: "",
        confirmPassword: "",
    },
})
 }
 handleLogin (e){
e.preventDefault(); 
const validation = this.validatorLogin.validate(this.state, "");
this.setState({
    validationLogin : validation,
    loginSubmitted : true
});
const {userName, password} = this.state;
if(validation.isValid){
    // login code
}
 }
 handleReg (e){
    e.preventDefault();
    const validation = this.validatorReg.validate(this.state, "user");
this.setState({
    validationReg : validation,
    regSubmitted : true
});
const {user} = this.state;
if(validation.isValid){
    // reg code
}
     }
    render() {
        const {userName, password,loginSubmitted,validationLogin, user,validationReg} = this.state;
        let _validatorReg = regSubmitted ? this.validatorReg.validate(this.state, 'user') : validationReg;
        let _validatorLogin = regSubmitted ? this._validatorLogin.validate(this.state, ) : validationLogin;
        
        return (
            <div>
                <Tabs selectedIndex={this.state.tabIndex} onSelect={(index) => { this.tabChange(index) }}>
                    <TabList className="nav nav-tabs tab-coupon">
                        <Tab className="nav-link"><Unlock />Login</Tab>
                        <Tab className="nav-link"><User />Register</Tab>
                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={this.handleLogin} >
                                <div className='form-group'>
                                    <input name="userName"
                                        type="email"
                                        placeholder="Username"
                                        className={"form-control " + (_validatorLogin.userName.isInvalid ? "has-error" : "")}
                                        value={userName}
                                        onChange={this.handleLoginInput}
                                    />
                                    {
                                        _validatorLogin.userName.isInvalid &&
                                        <div className='help-block' >{_validatorLogin.userName.message}</div>
                                    }
                                </div>
                                <div className='form-group'>
                                    <input name="password"
                                        type="password"
                                        placeholder="Password"
                                        className={"form-control " + (_validatorLogin.password.isInvalid ? "has-error" : "")}
                                        value={password}
                                        onChange={this.handleLoginInput}
                                    />
                                    {
                                        _validatorLogin.password.isInvalid &&
                                        <div className='help-block' >{_validatorLogin.password.message}</div>
                                    }
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit" >Login</button>
                                </div>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={this.handleReg} >
                                <div className="form-group">
                                    <input name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        className={"form-control " + (_validatorReg.firstName.isInvalid ? "has-error" : "")}
                                        value={user.firstName}
                                        onChange={this.handleRegInput}
                                    />
                                    {
                                        _validatorReg.firstName.isInvalid &&
                                        <div className='help-block' >{_validatorReg.firstName.message}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        className={"form-control " + (_validatorReg.lastName.isInvalid ? "has-error" : "")}
                                        value={user.lastName}
                                        onChange={this.handleRegInput}
                                    />
                                    {
                                        _validatorReg.lastName.isInvalid &&
                                        <div className='help-block' >{_validatorReg.lastName.message}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input name="email"
                                        type="email"
                                        placeholder="Email"
                                        className={"form-control " + (_validatorReg.email.isInvalid ? "has-error" : "")}
                                        value={user.email}
                                        onChange={this.handleRegInput}
                                    />
                                    {
                                        _validatorReg.email.isInvalid &&
                                        <div className='help-block' >{_validatorReg.email.message}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className={"form-control " + (_validatorReg.password.isInvalid ? "has-error" : "")}
                                        value={user.password}
                                        onChange={this.handleRegInput}
                                    />
                                    {
                                        _validatorReg.password.isInvalid &&
                                        <div className='help-block' >{_validatorReg.password.message}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className={"form-control " + (_validatorReg.confirmPassword.isInvalid ? "has-error" : "")}
                                        value={user.confirmPassword}
                                        onChange={this.handleRegInput}
                                    />
                                    {
                                        _validatorReg.confirmPassword.isInvalid &&
                                        <div className='help-block' >{_validatorReg.confirmPassword.message}</div>
                                    }
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit">Register</button>
                                </div>
                            </form>
                        </TabPanel>
                    </TabList>
                </Tabs>
                <ToastContainer />
            </div>
        )
    }
}

const MapStoreToProps = () =>{

}

const MapDispatchToProps = () =>{

}
export default connect(MapStoreToProps, MapDispatchToProps(LoginTabset)) 