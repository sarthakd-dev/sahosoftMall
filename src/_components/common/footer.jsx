import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 footer-copyright">
                                <p className="mb-0">Copyright 2022 ©Sahosoft Pvt. Ltd. All rights
                                    reserved.</p>
                            </div>
                            <div className="col-md-6">
                                <p className="pull-right mb-0">Sahosoft mall Admin panel<i className="fa faheart"></i></p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
