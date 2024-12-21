import React, { Component } from 'react'
import UserPanel from './user_panel'
import logo from '../../../assets/images/SahosoftMallBachend-logo.png'
export default class sidebar extends Component {
    render() {
        return (
            <div>
                <div className="page-sidebar">
                    <div className="main-header-left d-none d-lg-block">
                        <div className="logo-wrapper">
                            <img className="blur-up lazyloaded" src={logo} alt="sahosoft-logo" />
                        </div>
                    </div>
                    <div className="sidebar custom-scrollbar">
                        <div>
                            <UserPanel />
                        </div>
                        <ul className="sidebar-menu">
                            bind menu here
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
