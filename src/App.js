import './assets/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
  measurementId: "G-Y7B7DV2CLL"
};


const app = initializeApp(firebaseConfig);

const cookies = new Cookies();
library.add(fab, fas, far)
const token = cookies.get('jwt')

function App() {

  return (
    <div>
      {token ?
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className='content'>
              <div className='navbar-left'>
                <Link to="cosmetic/create" style={{textDecoration: 'none'}}><div className='btn-add'>Add New Product</div></Link>
                <div className='navbar-text active pt-4 mt-4'>
                  <img src={require('./assets/img/cos-active.png')} />
                  <label>Cosmetics</label>
                </div>
                <div className='navbar-text'>
                  <img src={require('./assets/img/skin.png')} />
                  <label>Skincare</label>
                </div>
                <div className='navbar-text'>
                  <img src={require('./assets/img/fragrance.png')} />
                  <label>Fragrance</label>
                </div>
                {/* <Link to="cosmetic/create" className="btn btn-success">Add New (+)</Link> */}
              </div>
              <div className='content-right'>
                <Routes>
                  {/* <Route path='/' element={<Login />}></Route> */}
                  <Route path='/' element={<CosmeticListing />}></Route>
                  <Route path='/cosmetic/create' element={<CosmeticCreate />}></Route>
                  <Route path='/cosmetic/detail/:cosid' element={<CosmeticDetail />}></Route>
                  <Route path='/cosmetic/edit/:cosid' element={<CosmeticEdit />}></Route>
                </Routes>
              </div>
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