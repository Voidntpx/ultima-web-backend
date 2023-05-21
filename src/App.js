import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import CosmeticListing from './CosmeticListing';
import CosmeticCreate from './CosmeticCreate';
import CosmeticDetail from './CosmeticDetail';
import CosmeticEdit from './CosmeticEdit';
function App() {
  return (
    <div className="App">
      <h1>Ultima Backdoor</h1>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CosmeticListing/>}></Route>
          <Route path='/cosmetic/create' element={<CosmeticCreate />}></Route>
          <Route path='/cosmetic/detail/:cosid' element={<CosmeticDetail />}></Route>
          <Route path='/cosmetic/edit/:cosid' element={<CosmeticEdit />}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );

 
}

export default App;
