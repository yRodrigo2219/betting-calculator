import React from 'react';

import MenuButton from '../common/MenuButton';
import { ReactComponent as Wallet } from '../../assets/wallet.svg';
import { ReactComponent as Odd } from '../../assets/odd.svg';
import { ReactComponent as Whistle } from '../../assets/whistle.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Percentage } from '../../assets/percentage.svg';
import { ReactComponent as Pie } from '../../assets/pie.svg';
import { ReactComponent as Chart } from '../../assets/chart.svg';

import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div>
                <MenuButton to='/odd' svg={Odd} name='Odds'/>
                <MenuButton to='/hedge' svg={Wallet} name='Hedge'/>
                <MenuButton to='/arbitrage' svg={Whistle} name='Arbitrage'/>
                <MenuButton to='/hold' svg={Percentage} name='Hold'/>
                <MenuButton to='/kelly' svg={Pie} name='Kelly'/>
                <MenuButton to='/evalue' svg={Chart} name='E.Value'/>
            </div>
            <MenuButton to='/' svg={Home} name='Home'/>
        </div>
    );
}