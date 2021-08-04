import React from 'react';
import './policyContainer.css';


const PolicyContainer = (props) => {
  return (
      <div className='policyContainer'>
        <input id={props.id} type='checkbox' defaultChecked={false } />
        <label className='pc-label' htmlFor={props.id}>{props.name}</label>
        <label className='pc-label' htmlFor={props.id}>{props.description}</label>
      </div>
  );

};

export default PolicyContainer;
