import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';
import { Carousel } from './layouts/HomePage/Carousel';
import { Presentation } from './layouts/HomePage/Presentation';
import { QAServices } from './layouts/HomePage/QAServices';
import { Footer } from './layouts/NavbarAndFooter/Footer';

function App() {
  return (
    <div>
        <Navbar/>
        <ExploreTopBooks/>
        <Carousel/>
        <Presentation/>
        <QAServices/>
        <Footer/>
    </div>
  );
}

export default App;
