import './assets/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CosmeticListing from './CosmeticListing';
import CosmeticCreate from './CosmeticCreate';
import CosmeticDetail from './CosmeticDetail';
import CosmeticEdit from './CosmeticEdit';
import SignIn from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from "react-router-dom";

library.add(fab, fas, far)

function App() {
  return (
    <div className="App">
      <div className='header__'>
        <div className='logo'>
          <img src={require('../src/assets/img/ultima-logo.png')} />
          <label>Ultima <label>Backoffice</label></label>
        </div>
        <div className='account'>
          <FontAwesomeIcon className='icon g' icon="fa-regular fa-circle-question" />
          <FontAwesomeIcon className='icon g ps-3 pe-4' icon="fa-solid fa-gear" />
          <div className='profile-pic'></div>
          <div className='text_ ps-2'>
            <label className='name'>Putita Techapat</label>
            <label>Admin for ultima</label>
          </div>
          <FontAwesomeIcon className='icon ps-3' icon="fa-solid fa-angle-down" />
        </div>
      </div>
      <div className='content'>
        <div className='navbar-left'>
          <div className='btn-add'>Add New Product</div>
          {/* <Link to="cosmetic/create" className="btn btn-success">Add New (+)</Link> */}

        </div>
        <div className='content-right'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<SignIn />}></Route>
              <Route path='/cosmetic' element={<CosmeticListing />}></Route>
              <Route path='/' element={<CosmeticListing />}></Route>
              <Route path='/cosmetic/create' element={<CosmeticCreate />}></Route>
              <Route path='/cosmetic/detail/:cosid' element={<CosmeticDetail />}></Route>
              <Route path='/cosmetic/edit/:cosid' element={<CosmeticEdit />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );


}

export default App;
