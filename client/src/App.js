import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Dashboard from './views/Dashboard'
// import DisplayAll from './views/DisplayAll';
// import Cart from './views/Cart';
// import OneProduct from './views/OneProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element= {<Navigate to="/dashboard" />} />

          {/* Create and Read */}
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* DISPLAY ALL */}
          {/* <Route path="/displayall" element={<DisplayAll/>} /> */}

          {/* not working at the moment....>>>... */}
          {/* SINGLE PRODUCT */}
          {/* <Route path="/product/:id" element={<OneProduct/>} /> */}
          {/* CART/BAG */}

          {/* <Route path='/cart' element={<Cart/>}/> */}

          {/* Update */}
          
          {/* Not Found */}
          {/* <Route path="" element={<NotFound/>}/> */}

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
