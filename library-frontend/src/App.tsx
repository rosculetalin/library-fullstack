import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';
import { Carousel } from './layouts/HomePage/Carousel';
import { Presentation } from './layouts/HomePage/Presentation';

function App() {
  return (
    <div>
        <Navbar/>
        <ExploreTopBooks/>
        <Carousel/>
        <Presentation/>
    </div>
  );
}

export default App;
