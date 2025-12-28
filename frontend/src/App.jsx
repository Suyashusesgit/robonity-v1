import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Forum from './pages/Forum';
import Events from './pages/Events';
import Newsletter from './pages/Newsletter';
import RoboShare from './pages/RoboShare';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SingleThreadPage from './pages/SingleThreadPage';
// import SubmitProject from './pages/SubmitProject';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Main Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/events" element={<Events />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/roboshare" element={<RoboShare />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/resources" element={<Resources />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dynamic Routes */}
          <Route path="/forum/thread/:threadId" element={<SingleThreadPage />} />
          {/* <Route path="/submit-project" element={<SubmitProject />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
