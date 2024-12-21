import React, { Component } from 'react'
import userImg from '../../../assets/images/user.png'
export default class UserPanel extends Component {
    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img src={userImg} className="img-60 rounded-circle lazyloaded blur-up" alt="#" />
                    </div>
                    <h6 className="mt-3 f-14">Ajeet Singh</h6>
                    <p>ajeetsingh@gmail.com</p>
                </div>
            </div>
        )
    }
}
