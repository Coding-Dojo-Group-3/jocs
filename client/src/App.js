import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NotFound from './components/NotFound';
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
          <Route element = {<NotFound />} path="/notfound" />
          {/* <Route element = {<Navigate to="/notfound" />} path="*" /> */}

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
