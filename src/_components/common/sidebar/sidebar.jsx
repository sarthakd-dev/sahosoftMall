import React, { Component } from 'react'
import UserPanel from './user_panel'
import logo from '../../../assets/images/SahosoftMallBachend-logo.png'
import { MENUITEMS } from '../../../constants/menu'
import { Link } from 'react-router-dom';
export default class sidebar extends Component {
    constructor() {
        super();
        this.state = {
            mainmenu: {}
        }
    }
    setNavActive(item) {
        MENUITEMS.filter(menuitem => {
            if (menuitem != item) {
                menuitem.active = false
            }
            if (menuitem.Children && menuitem.Children.includes(item)) {
                menuitem.active = true
            }
            if (menuitem.Children) {
                menuitem.Children.filter(subMenuItem => {
                    if (subMenuItem != item) {
                        menuitem.active = false
                    }
                    if (subMenuItem.Children) {
                        if (subMenuItem.Children.includes(item)) {
                            subMenuItem.Children.filter(itms => {
                                if (itms != item) {
                                    itms.active = false;
                                }
                            });
                            subMenuItem.active = true;
                            menuitem.active = true
                        }
                    }
                })
            }
        })
        item.active = !item.active;
        this.setState({ mainMenu: MENUITEMS })
    }
    componentWillMount() {
        this.setState({ mainmenu: MENUITEMS })
    }
    render() {
        const mainMenu = this.state.mainmenu.map((item, i) => {
            return <li key={i} className={item.active ? "active" : ""} >
                {
                    item.type === 'sub' ? <a className='sidebar-header' onClick={() => this.setNavActive(item)}><span ><item.icon />{item.title}</span> <i className='fa fa-angle-right pull-right'></i></a> :
                        <Link to={item.path} onClick={() => this.setNavActive(item)} className={`sidebar-header ${item.active ? "active" : ""}`}><span ><item.icon />{item.title}</span>
                        </Link>
                }
                {
                    item.Children ? <ul className={`sidebar-submenu  ${item.active ? "menu-open" : "menu-close"}`} >
                        {item.Children.map((child, j) => {
                            return <li key={j} className={child.Children ? child.active ? "active" : "" : ""}>
                                {
                                    child.type === 'sub' ? <a className='sidebar-header' onClick={() => this.setNavActive(child)}><span >{child.title}</span> <i className='fa fa-angle-right pull-right'></i></a> :
                                        <Link to={child.path} onClick={() => this.setNavActive(child)} className={`sidebar-header ${child.active ? "active" : ""}`}><span >{child.title}</span>
                                        </Link>
                                }
                                {
                                    
                                        child.Children ? <ul className={`sidebar-submenu  ${child.active ? "menu-open" : "menu-close"}`} >
                                            {child.Children.map((childrenSubItem, k) => {
                                                return <li key={k} className={childrenSubItem.Children ? childrenSubItem.active ? "active" : "" : ""}>
                                                    {
                                                        <Link to={childrenSubItem.path} onClick={() => this.setNavActive(childrenSubItem)} className={`sidebar-header ${childrenSubItem.active ? "active" : ""}`}><span >{childrenSubItem.title}</span>
                                                        </Link>
                                                    }

                                                </li>
                                            })}

                                        </ul> : ""
                                    
                                }
                            </li>
                        })}

                    </ul> : ""
                }
            </li>
        }

        )
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
                            {mainMenu}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
