import './assets/css/App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import CosmeticListing from './CosmeticListing';
import CosmeticCreate from './CosmeticCreate';
import CosmeticDetail from './CosmeticDetail';
import CosmeticEdit from './CosmeticEdit';
import Login from './Login';
import Navbar from './component/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import React, { useEffect,useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import UserListing from './UserManagement';
import EditUser from './EditUser';
import FragranceListing from './FragranceListing';
import SkincareListing from './SkincareListing';
import CloudMessaging from './CloudMessaging';
import RewardListing from './RewardListing'
import FragranceCreate from './FragranceCreate';
import RewardCreate from './RewardCreate';
import SkincareCreate from './SkincareCreate';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoiSAbsT3BlyqiebCozc6J3BgtV6re2gU",
  authDomain: "ultima-b32f3.firebaseapp.com",
  projectId: "ultima-b32f3",
  storageBucket: "ultima-b32f3.appspot.com",
  messagingSenderId: "889329332221",
  appId: "1:889329332221:web:4ac563814d6a18aba7f394",
  measurementId: "G-Y7B7DV2CLL",
  storageBucket: 'gs://ultima-b32f3.appspot.com'
};


const app = initializeApp(firebaseConfig);

const cookies = new Cookies();
library.add(fab, fas, far)
const token = cookies.get('jwt')




function App() {
  const [path, setPath] = useState("");


const CheckRoute = () => {
  const location = useLocation();  

  useEffect(() => {
    
    setPath(location.pathname);
    console.log('Current Pathname:', path);
  }, [location.pathname]);

  return null;
};
  const add_btn = path == '/' ? <Link to="cosmetic/create" style={{textDecoration: 'none'}}><div className='btn-add'>Add New Cosmetic</div></Link>
                : path == '/skincare' ? <Link to="skincare/create" style={{textDecoration: 'none'}}><div className='btn-add'>Add New Skincare</div></Link>
                : path == '/fragrance' ? <Link to="fragrance/create" style={{textDecoration: 'none'}}><div className='btn-add'>Add New Fragrance</div></Link>
        : path == '/reward' ? <Link to="reward/create" style={{ textDecoration: 'none' }}><div className='btn-add'>Add New Reward</div></Link>
                : "";

  return (
    <div>
      {token ?
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className='content'>
              <div className='navbar-left'>
                {add_btn}
                <div className='navbar-left_wraper'>
                <Link to="/">
                <div className={`navbar-text ${path == '/' ? 'active' : ''} pt-4 mt-4`}>
                  <img src={require(`./assets/img/cos${path == '/' ? '-active' : ''}.png`)} />
                  <label>Cosmetics</label>
                </div>
                </Link>

                <Link to="/skincare">
                <div className={`navbar-text ${path == '/skincare' ? 'active' : ''}`}>
                  <img src={require(`./assets/img/skin${path == '/skincare' ? '-active' : ''}.png`)} />
                  <label>Skincare</label>
                </div>
                </Link>

                <Link to="/fragrance">
                <div className={`navbar-text ${path == '/fragrance' ? 'active' : ''}`}>
                  <img src={require(`./assets/img/fragrance${path == '/fragrance' ? '-active' : ''}.png`)} />
                  <label>Fragrance</label>
                </div>
                </Link>

                <hr></hr>
                <Link to="user/management">
                <div className={`navbar-text ${path == '/user/management' ? 'active' : ''}`}>
                  {/* <img src={require('./assets/img/fragrance.png')} /> */}
                  <label>Admin Management</label>
                </div>
              </Link>
                <Link to="push-notification">
                  <div className={`navbar-text ${path == '/push-notification' ? 'active' : ''}`}>
                    {/* <img src={require('./assets/img/fragrance.png')} /> */}
                    <label>Cloud Messaging</label>
                  </div>
                </Link>

                <Link to="reward">
                    <div className={`navbar-text ${path == '/reward' ? 'active' : ''}`}>
                    {/* <img src={require('./assets/img/fragrance.png')} /> */}
                    <label>Reward Management</label>
                  </div>
                </Link>
                {/* <Link to="cosmetic/create" className="btn btn-success">Add New (+)</Link> */}
                </div>
              </div>
              <div className='content-right'>
                <Routes>
                  {/* {CheckRoute} */}
                  <Route path='/' element={<CosmeticListing />}>
                  </Route>
                  <Route path='/fragrance' element={<FragranceListing />}></Route>
                  <Route path='/fragrance/create' element={<FragranceCreate />}></Route>

                  <Route path='/skincare' element={<SkincareListing />}></Route>
                  <Route path='/skincare/create' element={<SkincareCreate />}></Route>

                  <Route path='/cosmetic/create' element={<CosmeticCreate />}></Route>
                  <Route path='/cosmetic/detail/:cosid' element={<CosmeticDetail />}></Route>
                  <Route path='/cosmetic/edit/:cosid' element={<CosmeticEdit />}></Route>

                  <Route path='/user/management' element={<UserListing />}></Route>
                  <Route path='/user/management/edit' element={<EditUser/>}></Route>

                  <Route path='/push-notification' element={<CloudMessaging />}></Route>

                  <Route path='/reward' element={<RewardListing />}></Route>
                  <Route path='/reward/create' element={<RewardCreate />}></Route>
                </Routes>
              </div>
              <CheckRoute />
            </div>
          </div>
        </BrowserRouter>
        :
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </div>}
    </div>

  );


}

export default App;
// { true ? <div>Welcome, User!</div> : <div>Please log in.</div> }