import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Component/Home";
import Create from "./Component/Create";
import Update from "./Component/Update";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/update/:id' element={<Update />} /> 
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
