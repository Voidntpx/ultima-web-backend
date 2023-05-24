import '../assets/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import React, { Component } from 'react'
import MenuListComposition from './menu';

library.add(fab, fas, far)

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'NavItemActive': ''
        }
    }

    render() {
        return (
            <div>
                <div className='header__'>
                    <div className='logo'>
                        <img src={require('../assets/img/ultima-logo.png')} />
                        <label>Ultima <label>Admin</label></label>
                    </div>
                    <div className='account'>
                        <FontAwesomeIcon className='icon g' icon="fa-regular fa-circle-question" />
                        <FontAwesomeIcon className='icon g ps-3 pe-4' icon="fa-solid fa-gear" />
                        <div className='profile-pic'></div>
                        <div className='text_ ps-2'>
                            <label className='name'>Putita Techapat</label>
                            <label>Admin for ultima</label>
                            
                        </div>
                        {/* <FontAwesomeIcon  className='icon ps-3' icon="fa-solid fa-angle-down" /> */}
                        <MenuListComposition/>
                    </div>
                </div>
            </div>


        )
    }
}

export default Navbar;