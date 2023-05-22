import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import CosmeticListing from './CosmeticListing';
import CosmeticCreate from './CosmeticCreate';
import CosmeticDetail from './CosmeticDetail';
import CosmeticEdit from './CosmeticEdit';
import SignIn from './Login';
function App() {
  return (
    <div className="App">
      {/* <h1>Ultima Back Office</h1> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}></Route>
          <Route path='/cosmetic' element={<CosmeticListing/>}></Route>
          <Route path='/cosmetic/create' element={<CosmeticCreate />}></Route>
          <Route path='/cosmetic/detail/:cosid' element={<CosmeticDetail />}></Route>
          <Route path='/cosmetic/edit/:cosid' element={<CosmeticEdit />}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );

 
}

export default App;
