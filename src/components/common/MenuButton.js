import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MenuButton(props) {
    return (
        <NavLink exact={props.exact} className='sb-item' to={props.to} activeClassName='sb-active'>
            <props.svg className='sb-icon' />
            <span>{props.name}</span>
        </NavLink>
    );
}