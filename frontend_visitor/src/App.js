import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbarHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AboutUs from './pages/aboutUs.js';
import WhatWeOffer from './pages/whatWeOffer.js';
import IWantTo from './pages/iWantTo/iWantTo.js';
import BrowsePolicies from './pages/browsePolicies.js';
import ContactForm from './pages/contactForm.js'
import LandingPage from './pages/landingPage/landingPage.js'

  
function App() {

  return (
    <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={LandingPage}/>
        <Route path='/AboutUs' component={AboutUs} />
        <Route path='/Iwantto' component={IWantTo} />
        <Route path='/WhatWeOffer' component={WhatWeOffer} />
        <Route path='/BrowsePolicies' component={BrowsePolicies} />
        <Route path='/ContactForm' component={ContactForm} />
      </Switch>
    </Router>

    
</div>
  );
}
  
export default App;