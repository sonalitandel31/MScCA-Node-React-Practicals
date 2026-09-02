import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Q1/Home';
import About from './components/Q1/About';
import Contact from './components/Q1/Contact';
import Navbar from './components/Q2/Navbar';
import User from './components/Q4/User';
import NotFound from './components/Q3/NotFound';
import MusicStore from './components/Q5/MusicStore';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/music" element={<MusicStore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
