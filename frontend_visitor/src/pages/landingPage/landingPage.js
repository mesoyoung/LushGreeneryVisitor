import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';


class LandingPage extends Component {
  render() {
    return (
      <div className='landingPage'>
        <div className='lushGreenery'>Lush Greenery</div>
        <div className='heading'>
          <div className='insurance'>Insurance, &nbsp;</div>
          <div className='simplified'>simplified</div>
        </div>
        <Link to='iwantto' className='findOutMore'>Find out more</Link>
      </div>
    );
  }
}

export default LandingPage;
