import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import ViewShoe from './views/ViewShoe';
import ViewCart from './views/ViewCart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element= {<Navigate to="/dashboard" />} />

          {/* Create and Read */}
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/user/cart/:id" element={<ViewCart/>} />
          <Route path="/shoe/:id" element={<ViewShoe/>} />

          {/* Update */}
          
          {/* Not Found */}
          {/* <Route path="" element={<NotFound/>}/> */}

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
