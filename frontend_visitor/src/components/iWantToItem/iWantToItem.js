import React from "react";
import { Link } from 'react-router-dom';
import './iWantToItem.css';


const IWantToItem = (props) => {


    var iWantToID = 0;
    function findiWantToID() {
        iWantToID = props.id;
        return iWantToID;
    }

    return (
        <ui className='iWantToItem'>

            <Link to ='/browsePolicies' className='linkStyle' onclick ={findiWantToID}>
                <label htmlFor={props.id}>
                    {props.name}
                </label>

            </Link>

        </ui>
    )
}



export default IWantToItem;