import React from "react";
import './iWantTo.css';
import IWantToItem from "../../components/iWantToItem/iWantToItem.js";




const IWANTTO = [
  { id: 'iWantTo-0', name: 'Buy insurance for NS' },
  { id: 'iWantTo-1', name: 'Buy insurance for Cars' },
  { id: 'iWantTo-2', name: 'Protect myself against major accidents' },
  
  { id: 'iWantTo-1', name: 'Buy insurance for Cars' },
  { id: 'iWantTo-2', name: 'Protect myself against major accidents' },
  { id: 'iWantTo-1', name: 'Buy insurance for Cars' },
  { id: 'iWantTo-2', name: 'Protect myself against major accidents' },
  { id: 'iWantTo-1', name: 'Buy insurance for Cars' },
  { id: 'iWantTo-2', name: 'Protect myself against major accidents' },
  { id: 'iWantTo-1', name: 'Buy insurance for Cars' },
  { id: 'iWantTo-2', name: 'Protect myself against major accidents' },
];


const IWantTo = () => {

  const iWantToList = IWANTTO.map(iWantToItem => (
    <IWantToItem id={iWantToItem.id} name={iWantToItem.name} />

  ));

  return (
    <div>
      <div className='header'>I want to...</div>
        
          <ul className='iWantToUL'>
              {iWantToList}
          </ul>

    </div>
  );
}


export default IWantTo;