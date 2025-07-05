import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopPage from './components/TopPage/top'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/top" element={<TopPage />} />
        {/* <Route path="/" element={<div>Home Page</div>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
