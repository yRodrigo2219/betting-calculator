import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuButton(props){
    return(
        <Link className='sb-item' to={props.to}>
            <props.svg className='sb-icon'/>
            <span>{props.name}</span>
        </Link>
    );
}