import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, { authUser }) =>
    <div>
       { authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

    Navigation.contextTypes = {
        authUser: PropTypes.object,
    };

    const NavigationAuth = () =>
        <div className="container is-fluid">
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to={routes.HOME} className="navbar-item">Home</Link>
                        
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/documentation/overview/start/">
                            Post
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <Link to="/post-list" className="navbar-item">
                                    List
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/documentation/overview/start/">
                            User
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <Link to="/user-list" className="navbar-item">
                                    List
                                </Link>
                                <Link to="/user-add" className="navbar-item">
                                    Add
                                </Link>
                            </div>
                            
                        </div>
                    </div>

                    <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">                    
                            <SignOutButton />
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
        </div>

    const NavigationNonAuth = () =>
        <div className="container is-fluid">
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to={routes.LANDING} className="navbar-item">Landing Page</Link>
                        
                        
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/documentation/overview/start/">
                            Post
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <Link to="/post-list" className="navbar-item">
                                    List
                                </Link>
                            </div>
                        </div>
                        
                    </div>

                    <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">                    
                            <Link to={routes.SIGN_IN} className="navbar-item">Sign In</Link>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
        </div>


export default Navigation;