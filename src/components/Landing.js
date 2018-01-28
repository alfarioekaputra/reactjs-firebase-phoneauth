import React from 'react';
import {Hero, HeroHead, Container, Nav, Button, Icon} from 'reactbulma';
import '../assets/css/landing.css';

const LandingPage = () =>
  <div>
    <Hero info fullheight>
    <Hero.Head>
        <Nav className="navbar">
        <Container>
            <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo"/>
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
            </div>
            <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <a className="navbar-item is-active">
                Home
              </a>
              <a className="navbar-item">
                Examples
              </a>
              <a className="navbar-item">
                Documentation
              </a>
              
            </div>
            </div>
        </Container>
        </Nav>
    </Hero.Head>
    </Hero>
  </div>

export default LandingPage;