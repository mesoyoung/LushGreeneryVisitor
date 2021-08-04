import React from 'react';
import { Dropdown, DropdownButton, } from 'react-bootstrap';
import IWantToItem from "../iWantToItem/iWantToItem.js";
import './dropdown.css';


const DROPDOWN = [
    { id: 'grid-0', name: 'Buy insurance for NS', href: "#/NSInsurance" },
    { id: 'grid-1', name: 'Buy insurance for Cars', href: "#/CarsInsurance" },
    { id: 'grid-2', name: 'Protect myself against major accidents', href: "#/SelfInsurance" }
];


var iWantToID = IWantToItem.iWantToID;


const DropdownContainer = () => {

    const dropdownList = DROPDOWN.map(dropdownItem => (
        <IWantToItem id={dropdownItem.id} name={dropdownItem.name} href={dropdownItem.href} />
    ));

    return (
        <div className='headerAndDropdown'>
            <div className='header'>I want to: &nbsp;</div>

            <div className='dropdownStyle' >
                <Dropdown>
                    <DropdownButton defaulzt={dropdownList[0]}  className='dropdownButton'>
                        <ul className='iWantToUL'>
                            <Dropdown.Item className='dropdownButton'>{dropdownList}</Dropdown.Item>
                        </ul>
                    </DropdownButton>
                </Dropdown>
                
            </div>
        </div>
    );
}


export default DropdownContainer;

