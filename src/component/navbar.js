import '../assets/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from "react-router-dom";

import React, { Component, useEffect, useState} from 'react'
import MenuListComposition from './menu';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
library.add(fab, fas, far)

const cookies = new Cookies();

class Navbar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            'NavItemActive': ''
        }
        
    }
   
   

    render() {
        // const [emaildata, emaildatachange] = useState("");
        var token = cookies.get('jwt');
        var decoded = jwt_decode(token);
        console.log(decoded)
        // emaildatachange(decoded['email'])
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
                        {/* <div className='profile-pic'></div> */}
                        <div className='text_ ps-2'>
                            <label className='name'>{decoded['f_name']} {decoded['l_name']}</label>
                            <label>Admin Role: {decoded['admin']}</label>
                            
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